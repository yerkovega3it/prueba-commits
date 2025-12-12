pipeline {
    agent any

    tools {
        nodejs 'node22.12.0'
    }

    environment {
        PIPELINE_AWS_ACCOUNT_ID = "533315175931"
        PIPELINE_AWS_CREDENTIALS_ID = "533315175931"
        GIT_CREDENTIALS_ID = "github-token-3it"
        AWS_ACCOUNT_ID = '533315175931'
        AWS_REGION = 'us-east-1'
        CLUSTER_NAME = "amsa-sgh-centinela-eks-cluster"
        NAMESPACE = "sigadash"
        ECR_REGISTRY = "533315175931.dkr.ecr.us-east-1.amazonaws.com"
        APP_NAME = "sigadash-frontend"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    cleanWs()
                    // Cleanup old kubeconfig files
                    sh '''
                        find /var/lib/jenkins/.kube/jobs -name "*.config" -type f -mmin +60 -delete 2>/dev/null || true
                    '''

                    def currentBranch = env.GIT_BRANCH ?: env.BRANCH_NAME ?: 'develop'
                    if (currentBranch.startsWith('origin/')) { currentBranch = currentBranch.replaceFirst('origin/', '') }
                    env.BRANCH_NAME = currentBranch
                    env.IS_PR = env.CHANGE_ID ? 'true' : 'false'
                    env.IS_RELEASE_BRANCH = currentBranch.contains('release') ? 'true' : 'false'
                    env.IS_DEVELOP_BRANCH = currentBranch.contains('develop') ? 'true' : 'false'

                    def repoUrl = ""; def repoName = ""; 
                    try {
                        repoUrl = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                        repoName = repoUrl.replaceAll('.*/([^/]+)\\.git$', '$1')
                    } catch (Exception e) {
                        if (env.GIT_URL) { repoUrl = env.GIT_URL; repoName = repoUrl.replaceAll('.*/([^/]+)\\.git$', '$1') }
                        else if (env.JOB_NAME) { def jp = env.JOB_NAME.split('/'); repoName = jp[-1] }
                        else { error "No se pudo determinar el nombre del repositorio" }
                    }
                    env.PROJECT_NAME = repoName
                    env.AWS_CREDENTIALS_ID = env.PIPELINE_AWS_CREDENTIALS_ID

                    if (env.IS_DEVELOP_BRANCH == 'true') {
                        env.ENVIRONMENT = 'dev'
                        env.VITE_API_URL = 'https://dev-amsa-sigadash-backend.3itapp.com/api'
                        env.VITE_ENVIROMENT = 'Desarrollo'
                        env.VITE_AMSA_LOGIN_URL = 'https://loginintegrado.aminerals.cl'
                        env.VITE_AMSA_LOGOUT_URL = 'https://loginintegrado.aminerals.cl/Login/LogoutAMSA'
                        env.DEPLOY_ALLOWED = 'true'
                    } else if (env.IS_RELEASE_BRANCH == 'true') {
                        env.ENVIRONMENT = 'qa'
                        env.VITE_API_URL = 'https://qa-amsa-sgh-api.3itapp.com/api'
                        env.VITE_ENVIROMENT = 'Desarrollo'
                        env.VITE_AMSA_LOGIN_URL = 'https://loginintegrado.aminerals.cl'
                        env.VITE_AMSA_LOGOUT_URL = 'https://loginintegrado.aminerals.cl/Login/LogoutAMSA'
                        env.DEPLOY_ALLOWED = 'true'
                    } else {
                        env.DEPLOY_ALLOWED = 'false'
                    }
                    
                    env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
                    
                    echo "Context: BRANCH=${env.BRANCH_NAME}, DEPLOY_ALLOWED=${env.DEPLOY_ALLOWED}, PROJECT=${env.PROJECT_NAME}"
                }
            }
        }

        stage('Checkout Source') {
            steps {
                script {
                    def branchForCheckout = (env.BRANCH_NAME && env.BRANCH_NAME != 'unknown') ? env.BRANCH_NAME : 'develop'
                    git branch: branchForCheckout, credentialsId: env.GIT_CREDENTIALS_ID, url: "https://github.com/3itsoluciones/${env.PROJECT_NAME}.git"
                }
            }
        }

        stage('Build & Push Docker Image') {
            when { expression { env.DEPLOY_ALLOWED == 'true' } }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-token-3it', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN'), [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                        
                        // Use PROJECT_NAME for repo name
                        def dockerImage = "${ECR_REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG}"
                        
                        // Ensure repo exists
                        sh "aws ecr describe-repositories --repository-names ${PROJECT_NAME} --region ${AWS_REGION} || aws ecr create-repository --repository-name ${PROJECT_NAME} --region ${AWS_REGION}"

                        echo "Building Docker Image: ${dockerImage}"
                        sh """
                            docker build -t ${dockerImage} \
                            --build-arg GIT_USERNAME=${GIT_USERNAME} \
                            --build-arg GIT_TOKEN=${GIT_TOKEN} \
                            --build-arg VITE_API_URL='${VITE_API_URL}' \
                            --build-arg VITE_ENVIROMENT='${VITE_ENVIROMENT}' \
                            --build-arg VITE_AMSA_LOGIN_URL='${VITE_AMSA_LOGIN_URL}' \
                            --build-arg VITE_AMSA_LOGOUT_URL='${VITE_AMSA_LOGOUT_URL}' \
                            .
                        """
                        
                        sh "docker push ${dockerImage}"
                        env.ECR_IMAGE = dockerImage
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            when { expression { env.DEPLOY_ALLOWED == 'true' } }
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                        sh "aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}"
                        
                        echo "Deploying to EKS Namespace: ${NAMESPACE}"
                        
                        // Create namespace if not exists
                        sh "kubectl get namespace ${NAMESPACE} || kubectl create namespace ${NAMESPACE}"

	                        // Replace placeholders in K8s manifests
	                        // Escaping $ for jenkins shell is tricky. using single quotes for sed expression helps.
	                        sh "sed -i 's|\\${ECR_IMAGE}|${ECR_IMAGE}|g' k8s/deployment.yaml"
	                        
	                        sh "kubectl apply -f k8s/ -n ${NAMESPACE}"
	                        
	                        sh "kubectl rollout status deployment/sigadash-frontend -n ${NAMESPACE} --timeout=120s"
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
