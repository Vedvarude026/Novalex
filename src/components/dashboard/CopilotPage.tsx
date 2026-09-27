import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types';
import { GoogleGenAI } from '@google/genai';
import {
  Sparkles,
  Send,
  Terminal,
  Copy,
  Check,
  Bot,
  User,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface CopilotPageProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const CopilotPage: React.FC<CopilotPageProps> = ({ messages, setMessages }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    'What should I fix first?',
    'Why is our EAL increasing?',
    'Optimize ₹50 lakh budget',
    'Explain top risk',
    'What happens if patching is delayed?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSendMessage = async (userPrompt?: string) => {
    const textToSend = userPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userPrompt) setInputText('');
    setIsTyping(true);

    try {
      // Check if Gemini API key is injected
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are DIGILEX Copilot, an elite AI cybersecurity risk intelligence engine for enterprise CISOs and executives.
The organization is Acme Financial Services.
Key Metrics:
- Total Expected Annual Loss (EAL): ₹4.82 Crore
- Top Risk Driver: Payment Gateway Server (PAY-GW-PROD-01) with CVE-2026-48291 (CVSS 9.8 Critical, EAL ₹1.92 Cr/yr, Remediation cost ₹5 Lakh, Risk Reduction ₹1.45 Cr, ROSI 29.0x).
- Optimizable Risk: ₹2.76 Crore within ₹50 Lakh budget.
- 0/1 Knapsack ROSI: 29.0x for Payment Gateway Patch and MFA.
Equation: EAL = Probability of Exploitation * Asset Value * Loss Magnitude * (1 - Control Effectiveness).
Keep responses executive-grade, concise, structured with bullet points, financial numbers in INR Lakh/Crore, and include technical formulas or code snippets when appropriate. Never give malicious exploit instructions.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${textToSend}` }] }
          ]
        });

        const replyText = response.text || 'Unable to generate response.';
        
        const aiMessage: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          codeSnippet: {
            language: 'bash',
            code: `EAL = P(exploit) * AssetValue * LossMagnitude * (1 - Ctrl)\n# Target: PAY-GW-PROD-01 | EAL: ₹1.92 Cr | ROSI: 29.0x`
          }
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // High quality simulated response fallback
        await new Promise((res) => setTimeout(res, 1000));
        let reply = '';
        let code = '';

        if (textToSend.includes('fix first') || textToSend.includes('Explain top risk')) {
          reply = `The Payment Gateway Server (PAY-GW-PROD-01) currently represents your highest financial exposure due to CVE-2026-48291 (CVSS 9.8 Critical), active threat actor campaigns (APT-44), and direct internet ingress.

• Estimated Annual Loss (EAL): ₹1.92 Crore/year
• Recommended Remediation: Apply patch KB-2026-901 and enforce rate limiting
• Remediation Cost: ₹5.00 Lakh
• Expected Risk Reduction: ₹1.45 Crore/year
• Return on Security Investment (ROSI): 29.0x`;
          code = `EAL_calc = P_exploit(0.88) * AssetValue(₹8.5Cr) * (1 - Ctrl(0.40))\n# Output EAL: ₹1.92 Cr/yr`;
        } else if (textToSend.includes('50 lakh budget') || textToSend.includes('Optimize')) {
          reply = `Running the DIGILEX 0/1 Knapsack Fund Optimizer on your ₹50.00 Lakh budget yields the maximum financial risk reduction portfolio:

1. Patch Payment Gateway Server (Cost: ₹5.0 L | Risk Reduced: ₹1.45 Cr)
2. Enable MFA for Privileged Accounts & DB Gateway (Cost: ₹2.0 L | Risk Reduced: ₹58 L)
3. Cloud Access Hardening (Cost: ₹2.0 L | Risk Reduced: ₹35 L)
4. API Gateway Proxy Upgrade (Cost: ₹1.5 L | Risk Reduced: ₹28 L)

Total Selected Cost: ₹10.50 Lakh / ₹50.00 Lakh
Total Risk Reduced: ₹2.66 Crore/year
Portfolio ROSI: 25.3x`;
          code = `knapsack_solve(items=[cve_48291, cve_39102, cve_28910], capacity=5000000)\n# Optimized Reduction: ₹2.66 Cr`;
        } else {
          reply = `According to the DIGILEX Risk Quantification Engine, delaying patching on critical assets increases your 90-day Expected Annual Loss from ₹4.82 Crore to ₹6.45 Crore (+33.8% exposure).

Key Financial Drivers:
• Active threat campaigns exploit unpatched vulnerabilities within 14 days of release.
• Delaying remediation beyond 30 days increases incident likelihood by 2.4x.`;
          code = `forecast_trajectory(delay_days=60)\n# Risk Exposure: ₹5.74 Cr (+₹92 L compounding)`;
        }

        const aiMessage: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          codeSnippet: {
            language: 'python',
            code: code
          }
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'ai',
          text: 'DIGILEX Copilot experienced a transient network error. Payment Gateway remains priority #1 (EAL ₹1.92 Cr).',
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-100px)] flex flex-col justify-between">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white font-sans flex items-center gap-2">
              DIGILEX Copilot
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50 px-2 py-0.5 rounded">
                AI Cyber Risk Assistant
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Ask natural language questions about financial exposure, EAL, and ROSI
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs font-sans space-y-2 shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#111827] border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

              {/* Code Snippet Box if present */}
              {msg.codeSnippet && (
                <div className="mt-3 bg-[#0B0F17] border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-cyan-300 relative group">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      {msg.codeSnippet.language} snippet
                    </span>
                    <button
                      onClick={() => handleCopyCode(msg.codeSnippet!.code, msg.id)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied ✓</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="mt-2 overflow-x-auto text-slate-300">
                    <code>{msg.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              <div className="text-[9px] font-mono opacity-60 text-right mt-1">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-blue-600 border border-blue-400 flex items-center justify-center text-white shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 animate-pulse">
            <Bot className="w-4 h-4" />
            <span>DIGILEX Copilot is analyzing financial risk vectors...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Chips & Input Bar */}
      <div className="space-y-3 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {promptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip)}
              className="px-2.5 py-1 rounded-full bg-[#111827] hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask DIGILEX Copilot about EAL, budget allocation, or CVE-2026-48291..."
            className="w-full bg-[#111827] border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
          <button
            onClick={() => handleSendMessage()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
