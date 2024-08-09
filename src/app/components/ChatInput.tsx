'use client'

import { cn } from '@/lib/utils'
import { Message } from '@/lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

// Interface below allows the ChatInput component to receive all the attributes that a normal div tag gets
interface ChatInputProps extends HTMLAttributes<HTMLDivElement>{
  
}

const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {

    const [input, setInput] = useState<string>('')
    const { mutate: sendMessage } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({messages: 'hello'}),
            })

            return response.body
        },
        onSuccess: () => {
            console.log("Success")
        }
    })

    // Code below allows the ChatInput component to receive all the attributes that a normal div tag gets
  return <div {...props} className={cn('border-t border-zinc-300', className)}>
    <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize 
            rows={2}
            maxRows={4}
            value={input}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey){
                    e.preventDefault()

                    const message: Message = {
                        id: nanoid(),
                        isUserMessage: true,
                        text: input
                    }
                    sendMessage(message)
                }
            }}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            placeholder='Got any questions?'
            className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'   
        />
    </div>
  </div>
}

export default ChatInput