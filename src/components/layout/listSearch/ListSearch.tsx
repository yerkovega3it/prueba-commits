import { Button, Input } from 'uikit-3it-react'
import { FaIcon } from '@/components'
import { icons } from '@/components/icons'
import type { ListSearchProps } from "@/interfaces"

export default function ListSearch({
  input = '',
  searchPlaceholder = 'Search...',
  btnFilter = true,
  btnNewRecord = '',
  btnDownload = {
    loading: false,
    isDisabled: false,
    active: false
  },
  //Callbacks
  onNewRecord,
  onDownloadRecords,
  onSlideFilter,
  onInputSearch,
  onPressEnter
}: ListSearchProps) {

  return (
    <>
      <div 
        data-eit-display="flex"
        data-eit-flex-wrap='wrap'
        data-eit-gap="2"
        data-eit-mb="3"
      >
        {btnFilter && (
          <div 
            data-eit-flex-grow='1'
            data-eit-flex-grow-lg='0'
            data-eit-flex-shrink-lg='0'
          >
            <Button
              text="Filtrar"
              icon={icons.sliders}
              data-eit-variant='gray'
              data-eit-outline
              data-eit-w="100"
              onClick={onSlideFilter}
            />
          </div>
        )}
        <div data-eit-flex-grow='1'>
          <Input
            type="text"
            value={input}
            placeholder={searchPlaceholder}
            onValueChange={onInputSearch}
            onEmitPressEnter={onPressEnter}
            leftSlot={
              <FaIcon name="magnifyingGlass"/>
            }
            rightSlot={
              <span 
                className="eit-icon-enter"
                v-tippy="handleTooltip('Presiona ENTER para buscar', false, 'top')"
              >
                <FaIcon 
                  name="arrowTurnDown"
                  className='eit-transform'
                  data-eit-rotate='90'
                />
              </span>
            }
          >
          </Input>
        </div>
        <div 
          data-eit-flex-grow='1'
          data-eit-flex-grow-lg='0'
          data-eit-flex-shrink-lg='0'
          data-eit-display="flex"
          data-eit-gap="2"
        >
          {btnDownload.active && (
            <Button
              text=""
              icon={icons.download}
              data-eit-variant='gray'
              data-eit-outline
              loading={btnDownload.loading}
              loadingText=""
              isDisabled={btnDownload.isDisabled}
              onClick={onDownloadRecords}
              v-tippy="handleTooltip('Descargar información', false, 'top')"
            />
          )}
        {btnNewRecord && (
          <Button
            text={btnNewRecord}
            icon={icons.plus}
            data-eit-variant='primary'
            data-eit-w="100"
            onClick={onNewRecord}
          />
        )}
        </div>
      </div>
    </>
  )
}