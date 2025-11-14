pipeline {
    agent any

    tools {
        nodejs 'node22.12.0'
    }

    environment {
        PIPELINE_AWS_ACCOUNT_ID = "533315175931"
        PIPELINE_AWS_CREDENTIALS_ID = "533315175931"
        GIT_CREDENTIALS_ID = "github-token-3it"
        SCAN_TIMEOUT = "600"
        FS_SCAN_TIMEOUT = "300"
        PIPELINE_EKS_CLUSTER = "pipeline-3it-eks-cluster"
        SONAR_TOKEN = credentials('sonar.token')
        NODE_ENV = "production"
        BUILD_COMMAND = "npm run build"
        DIST_FOLDER = "dist"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    cleanWs()
                    // Cleanup old kubeconfig files before starting new job (inline safe cleanup)
                    sh '''
                        find /var/lib/jenkins/.kube/jobs -name "*.config" -type f -mmin +60 -delete 2>/dev/null || true
                    '''

                    def currentBranch = env.GIT_BRANCH ?: env.BRANCH_NAME ?: 'develop'
                    if (currentBranch.startsWith('origin/')) { currentBranch = currentBranch.replaceFirst('origin/', '') }
                    env.BRANCH_NAME = currentBranch
                    env.IS_PR = env.CHANGE_ID ? 'true' : 'false'
                    env.IS_RELEASE_BRANCH = currentBranch.contains('release') ? 'true' : 'false'
                    env.IS_DEVELOP_BRANCH = currentBranch.contains('develop') ? 'true' : 'false'

                    def repoUrl = ""; def repoName = ""; def clientName = ""; def serviceName = ""
                    try {
                        repoUrl = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                        repoName = repoUrl.replaceAll('.*/([^/]+)\\.git$', '$1')
                    } catch (Exception e) {
                        if (env.GIT_URL) { repoUrl = env.GIT_URL; repoName = repoUrl.replaceAll('.*/([^/]+)\\.git$', '$1') }
                        else if (env.JOB_NAME) { def jp = env.JOB_NAME.split('/'); repoName = jp[-1] }
                        else { error "No se pudo determinar el nombre del repositorio (git config/GIT_URL/JOB_NAME)" }
                    }
                    if (repoName && repoName.contains('-')) { def rp = repoName.split('-'); clientName = rp[0]; serviceName = rp.size()>1? rp[1..-1].join('-') : '' } else { clientName = 'propamat'; serviceName = 'core' }
                    env.CLIENT_NAME = clientName; env.MICROSERVICE_NAME = serviceName; env.PROJECT_NAME = repoName

                    env.AWS_ACCOUNT_ID = '533315175931'
                    env.AWS_REGION = 'us-east-1'
                    env.AWS_CREDENTIALS_ID = env.PIPELINE_AWS_CREDENTIALS_ID

                    if (env.IS_DEVELOP_BRANCH == 'true') {
                        env.ENVIRONMENT = 'dev'
                    } else if (env.IS_RELEASE_BRANCH == 'true') {
                        env.ENVIRONMENT = 'qa'
                    } else {
                        env.ENVIRONMENT = 'dev'
                    }

                    // Set infra targets based on branch (early in pipeline)
                    if (env.IS_DEVELOP_BRANCH == 'true') {
                        env.AWS_ACCOUNT_ID = '533315175931'
                        env.AWS_REGION  = 'us-east-1'
                        env.BUCKET_NAME = 'dev-amsa-sigadash-frontend.3itapp.com'
                        env.CLOUDFRONT_DISTRIBUTION_ID = 'E1ITZKC1KOCBQB'
                        env.VITE_API_URL = 'https://dev-amsa-sigadash-backend.3itapp.com/api'
                        env.VITE_ENVIROMENT = 'Desarrollo'
                        env.DEPLOY_ALLOWED = 'true'
                    } else if (env.IS_RELEASE_BRANCH == 'true') {
                        env.AWS_ACCOUNT_ID = '533315175931'
                        env.AWS_REGION  = 'us-east-1'
                        env.BUCKET_NAME = 'qa-amsa-sigadash-frontend.3itapp.com'
                        env.CLOUDFRONT_DISTRIBUTION_ID = '123123'
                        env.VITE_API_URL = 'https://qa-amsa-sgh-api.3itapp.com/api'
                        env.VITE_ENVIROMENT = 'Desarrollo'
                        env.DEPLOY_ALLOWED = 'true'
                    } else {
                        env.DEPLOY_ALLOWED = 'false'
                    }

                    echo "Context: BRANCH=${env.BRANCH_NAME}, DEPLOY_ALLOWED=${env.DEPLOY_ALLOWED}, REGION=${env.AWS_REGION}, BUCKET=${env.BUCKET_NAME}"
                }
            }
        }

        stage('Checkout Source') {
            steps {
                script {
                    def repoNameForCheckout = env.PROJECT_NAME ?: 'propamat-core-front-vue'
                    def branchForCheckout = (env.BRANCH_NAME && env.BRANCH_NAME != 'unknown') ? env.BRANCH_NAME : 'develop'
                    def repoHttpUrl = "https://github.com/3itsoluciones/${repoNameForCheckout}.git"
                    echo "Checking out ${repoHttpUrl} branch ${branchForCheckout}"
                    git branch: branchForCheckout, credentialsId: env.GIT_CREDENTIALS_ID, url: repoHttpUrl

                    env.BRANCH_NAME = branchForCheckout
                    env.IS_DEVELOP_BRANCH = branchForCheckout.contains('develop') ? 'true' : 'false'
                    env.IS_RELEASE_BRANCH = branchForCheckout.contains('release') ? 'true' : 'false'
                    if (env.IS_RELEASE_BRANCH == 'true' && env.IS_PR != 'true') { env.DEPLOY_ALLOWED = 'true' }
                    else if (env.IS_DEVELOP_BRANCH == 'true') { env.DEPLOY_ALLOWED = 'true' }
                    echo "Post-checkout context: BRANCH=${env.BRANCH_NAME}, DEPLOY_ALLOWED=${env.DEPLOY_ALLOWED}"
                }
            }
        }

        stage('Install dependencies') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token-3it', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
                    script {
                        sh 'npm remove uikit-3it-react || true'
                        sh '''
                            echo "Installing uikit-3it-react..."
                            npm install "https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/3itsoluciones/uikit-3it-react-ts.git#develop"
                        '''
                        sh 'npm install vite@7.1.2 --save-dev'
                        sh 'npm install @vitejs/plugin-react-swc@4.0.0 --save-dev'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Generate build') {
            steps {
                script {
                    writeFile file: '.env', text: """
VITE_API_URL=\${env.VITE_API_URL}
VITE_ENVIROMENT=\${env.VITE_ENVIROMENT}
"""
                    sh '''
                        echo "Building frontend application..."
                        rm -rf node_modules package-lock.json
                        npm install --include=dev
                        if [ ! -f "node_modules/.bin/vite" ]; then
                          npm install vite@7.1.2 @vitejs/plugin-react-swc@4.0.0 --save-dev
                        fi
                        if npm run | grep -qE "^  build$"; then
                          echo "Running ${BUILD_COMMAND:-npm run build}"
                          ${BUILD_COMMAND:-npm run build}
                        elif [ -f "vite.config.js" ] || [ -f "index.html" ]; then
                          echo "No build script found; using vite build fallback"
                          npx vite build
                        else
                          echo "WARNING: No build script and no vite project detected; creating empty dist/"
                          mkdir -p dist
                        fi
                    '''
                }
            }
        }

        stage('Upload build to s3') {
            when { expression { env.DEPLOY_ALLOWED == 'true' } }
            steps {
                script {
                    echo "Uploading build to S3 bucket: ${env.BUCKET_NAME}"
                    sh 'ls -la dist || true'
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                        sh '''
                            if [ -d "./dist" ] && [ "$(ls -A ./dist 2>/dev/null)" ]; then
                              aws s3 sync ./dist s3://$BUCKET_NAME --delete --cache-control "max-age=300"
                            else
                              echo "No dist/ folder with build artifacts. Skipping S3 upload."
                            fi
                        '''
                    }
                }
            }
        }

        stage('Invalidate CloudFront') {
            when { expression { env.DEPLOY_ALLOWED == 'true' && env.CLOUDFRONT_DISTRIBUTION_ID } }
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                        sh '''
                            echo "Creating CloudFront invalidation for distribution: $${CLOUDFRONT_DISTRIBUTION_ID}"
                            INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
                                --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
                                --paths "/*" \
                                --region $AWS_REGION \
                                --output json)
                            echo "$INVALIDATION_OUTPUT"
                        '''
                    }
                }
            }
        }

        stage('Skip Deployment') {
            when { expression { env.DEPLOY_ALLOWED == 'false' } }
            steps { echo "Deployment skipped for this build context" }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false, deleteDirs: true, disableDeferredWipeout: true, notFailBuild: true)
        }
    }
}
