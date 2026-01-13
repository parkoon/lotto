import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import React from 'react'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'
import { cn } from '@/lib/utils'

import { Button, ButtonProps } from './button'

type AlertDialogProps = {
  title?: string
  description?: string | React.ReactNode
  open?: boolean
  onOk?(): void
  onCancel?(): void
  okText?: string
  cancelText?: string
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  hideCancelButton?: boolean
  classNames?: {
    title?: string
    description?: string
  }
  content?: React.ReactNode
}
const GUTTER = 16

const AlertDialog = ({
  title,
  description,
  open,
  content,
  onOk,
  onCancel,
  classNames,
  okButtonProps,
  cancelButtonProps,
  hideCancelButton = false,
  okText = 'Confirm',
  cancelText = 'Cancel',
}: AlertDialogProps) => {
  return (
    <AlertDialogPrimitive.Root open={open}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40" />
        <AlertDialogPrimitive.Content
          style={{
            maxWidth: MAX_MOBILE_SCREEN_WIDTH - GUTTER * 2,
            width: `calc(100% - ${GUTTER * 2}px)`,
          }}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 nb-shadow fixed top-[50%] left-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-4 duration-200"
        >
          {title && (
            <AlertDialogPrimitive.Title
              className={cn('text-lg font-bold', classNames?.title)}
            >
              {title}
            </AlertDialogPrimitive.Title>
          )}
          {description && (
            <AlertDialogPrimitive.Description
              className={classNames?.description}
            >
              {description}
            </AlertDialogPrimitive.Description>
          )}

          <section className="pt-6 pb-8">{content}</section>

          <div className="flex gap-2">
            {!hideCancelButton && (
              <Button
                size="sm"
                inline
                onClick={onCancel}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
            )}

            <Button size="sm" inline onClick={onOk} {...okButtonProps}>
              {okText}
            </Button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export default AlertDialog
