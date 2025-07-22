'use client';

import { InterviewDataContext } from '@/app/(main)/_context/interviewdatacontext';
import { Bot, Mic, Phone, Timer, User } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/alert-confirmation';
import { toast } from 'sonner';
import { GenerateInterviewFeedback } from '@/configs/AIModel';
import { storeInterviewFeedback } from '@/actions/botprep';

export default function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join(', ');

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
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
            content: `
You are an AI voice assistant conducting interviews. Your job is to ask candidates provided interview questions and assess their responses.

Begin with a friendly intro: 
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate’s response. Be clear and concise.

Questions: ${questionList}

If they struggle, rephrase or give a hint (without the answer).
Example: "Need a hint? Think about how React tracks component updates!"

After each response, provide quick feedback like:
- "Nice! That's a solid answer."
- "Hmm, not quite! Want to try again?"

Wrap up with a summary like:
"That was great! You handled some tough questions well."

End positively:
"Thanks for chatting! Hope to see you crushing projects soon!"

Guidelines:
1. Be friendly and witty
2. Keep it short and natural
3. Adapt to confidence level
4. Keep it focused on React
            `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
  };

  vapi.on('speech-start', () => setActiveUser(false));
  vapi.on('speech-end', () => setActiveUser(true));

  vapi.on('call-start', () => {
    toast('Call Connected...');
    console.log('Call has started.');
  });

  vapi.on('call-end', () => {
    toast('Call Ended...');
    console.log('Call has ended.');
    generateFeedback();
  });

  vapi.on('message', (message) => {
    if (message?.conversation) {
      conversationRef.current = message.conversation;
    }
    console.log('Message received:', message);
  });

  const generateFeedback = async () => {
    const conv = conversationRef.current?.conversation;

    if (!conv || conv.length === 0) {
      toast.error('Conversation is empty!');
      return;
    }

    try {
      const feedback = await GenerateInterviewFeedback(conv);

      if (!feedback?.feedback) {
        toast.error('No feedback returned from AI');
        return;
      }

      const {
        feedback: {
          rating: { technicalSkills, communication, problemSolving, experience },
          summary,
          recommendation,
          reason,
        },
      } = feedback;

      const response = await storeInterviewFeedback({
        interviewId: interviewInfo.interviewData.id,
        technicalSkills,
        communication,
        problemSolving,
        experience,
        summary,
        recommendation,
        reason,
      });

      if (response.success) {
        toast('Feedback saved successfully!');
      } else {
        toast.error('Failed to save feedback: ' + response.message);
      }
    } catch (err) {
      console.error('Error generating feedback:', err);
      toast.error('Feedback generation failed.');
    }
  };

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
        <div
          className={`bg-secondary h-[400px] rounded-md flex items-center justify-center border ${!activeUser && 'border-primary'}`}
        >
          <Bot />
        </div>

        <div
          className={`bg-secondary h-[400px] rounded-md flex flex-col items-center justify-center gap-2 ${activeUser && 'border-primary'}`}
        >
          <User />
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center my-5">
        <Mic
          className="w-12 h-12 p-3 bg-gray-300 rounded-full text-black cursor-pointer"
          onClick={() => console.log(interviewInfo)}
        />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="w-12 h-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center my-5">Interview in Progress...</h2>
    </div>
  );
}
