'use client'

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

// Interface below allows the ChatInput component to receive all the attributes that a normal div tag gets
interface ChatInputProps extends HTMLAttributes<HTMLDivElement>{
  
}

const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {

    const [input, setInput] = useState<string>('')
    const { messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating } = useContext(MessagesContext)
    // Grants us access to the Textarea DOM node
    const textareaRef = useRef<null | HTMLTextAreaElement>(null); 

    const { mutate: sendMessage } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({messages: [message]}),
            })

            return response.body
        },
        onMutate(message){
            addMessage(message)
        },
        onSuccess: async (stream) => {
            if(!stream) throw new Error('No Stream Found!')

            const id = nanoid()
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: ''
            }

            addMessage(responseMessage)
            setIsMessageUpdating(true)

            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false

            while(!done){
                const {value, done: doneReading} = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                updateMessage(id, (prev) => prev + chunkValue)
            }

            // Cleanup
            setIsMessageUpdating(false)
            setInput('')
            setTimeout(() => {
                textareaRef.current?.focus()
            }, 10)
        }
    })

    // Code below allows the ChatInput component to receive all the attributes that a normal div tag gets
  return <div {...props} className={cn('border-t border-zinc-300', className)}>
    <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize 
            ref={textareaRef}
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