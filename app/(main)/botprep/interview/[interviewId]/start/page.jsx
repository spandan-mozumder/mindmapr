'use client';

import { InterviewDataContext } from '@/app/(main)/_context/interviewdatacontext';
import { Bot, Mic, Phone, Timer, User } from 'lucide-react';
import React, { useContext, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/alert-confirmation';

export default function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join(', ');

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage:
        'Hi ' +
        interviewInfo?.userName +
        ', how are you? Ready for your interview on ' +
        interviewInfo?.interviewData?.jobPosition +
        '?',
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              `You are an AI voice assitant conducting interviews. You job is to ask canditates provided intervier questions, asess their responses.
          Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example: "Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let's get started with a few questions!"
          Ask one question at a time and wait for the candidate''s response before processing. Keep the questions clear and concise. Below  are the questions you need to ask:
          Questions: ` +
              questionList +
              `
          If the candidate struggle, offer hints or rephrase the question without giving away the answer. Example:
          "Need a hint? Think about how React tracks component updates!"
          Provide brief, encouraging feedback after each answer. Example:
          "Nice! That's a solid answer."
          "Hmm, not quite! Wamt to try again?"
          Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
          After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
          "That was great! You handle some tough questions well. Keep sharpening your skills!"
          End on a positive note:
          "Thanks for chatting! Hope to see you crushing projects soon!
          Key Guidelines:
          1. Be friendly, engaging and witty
          2. Keep responses short and natural, like a real conversation
          3. Adapt based on the candidates confidence level
          4. Ensure the interview remians focused on React
          `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop()
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl flex justify-between m-5">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="bg-secondary h-[400px] rounded-md flex items-center justify-center">
          <Bot />
        </div>

        <div className="bg-secondary h-[400px] rounded-md flex flex-col items-center justify-center gap-2">
          <User />
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center my-5">
        <Mic className="w-12 h-12 p-3 bg-gray-300 rounded-full text-black cursor-pointer" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
        <Phone className="w-12 h-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center my-5">Interview in Progress...</h2>
    </div>
  );
}
