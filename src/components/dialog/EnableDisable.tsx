import { useMemo, forwardRef } from 'react'
import { Dialog, Alert, Error } from 'uikit-3it-react'
import type { EnableDisableProps, EnableDisableExpose  } from '@/interfaces'
import { FaIcon } from '@/components'

export default forwardRef<EnableDisableExpose, EnableDisableProps>(function EnableDisable({
  data,
  customRecord,
  children,
  onSubmit,
}, ref) {

  const controlBtnSubmitEnableDisable = useMemo(() => {
    if(data.record?.recordStatus.status) {
      return {
        text: 'Deshabilitar',
        loadingText: 'Deshabilitando...',
        variant: 'red'
      }
    }
    else {
      return {
        text: 'Habilitar',
        loadingText: 'Habilitando...',
        variant: 'green'
      }
    }
  }, [data.record?.recordStatus.status])

  return (
    <Dialog
      ref={ref}
      className="eit-dialog--top"
      btnSubmit={true}
      loading={data.loading}
      loadingSubmit={data.loadingBtn}
      disabledSubmit={data.disabledSubmit}
      messageAlert={data.messageAlert}
      btnSubmitConfig={controlBtnSubmitEnableDisable}
      onSubmit={onSubmit}
      head={
        <h3 
          data-eit-font-size="x5"
          data-eit-color="text"
          data-eit-m="0"
        >
          {data.record?.recordStatus.status ? (
            <>
              <FaIcon name="ban" 
                data-eit-color="red"
                data-eit-me="1"
              />
              Deshabilitar
            </>
          ) : (
            <>
              <FaIcon name="circleCheck" 
                data-eit-color="green"
                data-eit-me="1"
              />
              Habilitar
            </>
          )}
        </h3>
      }
      content={
        <>
          <Alert
            data-eit-variant={data.messageAlert.variant}
            data-eit-mb="3"
            icon={data.messageAlert.icon}
            message={data.messageAlert.message}
          />
          <div 
            data-eit-border="all"
            data-eit-border-color="default"
            data-eit-border-radius="x3"
            data-eit-p="2"
          >
            <div 
              data-eit-display="flex"
              data-eit-align="center"
            >
              <div data-eit-flex-shrink='0'>
                <FaIcon name={customRecord?.icon || 'circleInfo'} 
                  data-eit-font-size="x8"
                  data-eit-color="secondary"
                />
              </div>
              <div 
                data-eit-flex-grow='1'
                data-eit-ms="3"
              >
                <h4 
                  data-eit-color="text"
                  data-eit-font-size="x4"
                  data-eit-m="0"
                >
                  { customRecord?.title }
                </h4>
                <p 
                  data-eit-m="0"
                  data-eit-color="text-soft"
                  data-eit-font-size="x2"
                >
                  { customRecord?.subtitle }
                </p>
              </div>
            </div>
          </div>

          {children}

          <Error
            data={data.errorBack}
            className="eit-mt-3"
          />
        </>
      }
    >
    </Dialog>
  )
})