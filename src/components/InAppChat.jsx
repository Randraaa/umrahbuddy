import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

export default function InAppChat({ activeChat, currentUser, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'guide', text: "Assalamu'alaikum. Selamat bergabung di Umrah Buddy. Saya siap mendampingi perjalanan ibadah Anda agar khusyuk dan lancar. Silakan kabari jika ada hal awal yang perlu didiskusikan.", time: "16:30" }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: messages.length + 1,
      sender: currentUser.role === 'pilgrim' ? 'pilgrim' : 'guide',
      text: inputText,
      time: timeNow
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Trigger automated bot response after 1.5 seconds
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      let replyText = "";
      
      if (currentUser.role === 'pilgrim') {
        replyText = `Wa'alaikumussalam Warahmatullahi Wabarakatuh, Akhi/Ukhti. Terima kasih atas pesan Anda. Saya telah mencatat kebutuhan khusus dan rencana tanggal keberangkatan Anda. Insya Allah, kita akan jadwalkan panggilan suara singkat pra-keberangkatan untuk memantapkan persiapan manasik.`;
      } else {
        replyText = `Jazakallah Khair Ustadz atas bimbingan dan respons cepatnya. Kami sangat terbantu dan akan segera mempersiapkan hal-hal tersebut sebelum jadwal keberangkatan kami.`;
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: currentUser.role === 'pilgrim' ? 'guide' : 'pilgrim',
        text: replyText,
        time: replyTime
      }]);
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '20px', borderRadius: '8px', padding: '8px 16px' }}>
        <ArrowLeft size={16} />
        <span>Kembali ke Dashboard</span>
      </button>

      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-partner-info">
            <div className="chat-partner-avatar">
              {activeChat.partnerName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="chat-partner-name">{activeChat.partnerName}</span>
              <span className="chat-partner-status" style={{ display: 'block' }}>Aktif Membimbing</span>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="chat-messages">
          {messages.map(msg => {
            const isMe = (currentUser.role === 'pilgrim' && msg.sender === 'pilgrim') ||
                         (currentUser.role === 'guide' && msg.sender === 'guide');
            
            return (
              <div 
                key={msg.id} 
                className={`chat-bubble ${isMe ? 'sent' : 'received'}`}
              >
                <p>{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan bimbingan manasik atau jadwal koordinasi..." 
          />
          <button type="submit" className="btn-send" aria-label="Kirim Pesan">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
