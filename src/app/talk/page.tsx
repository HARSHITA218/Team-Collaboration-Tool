'use client'

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createClient } from '@supabase/supabase-js';

// We initialize a client-side Supabase instance for realtime capabilities
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
}

export default function TalkPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'John Doe', text: 'Hey team, did you see the new designs?', time: '10:30 AM' },
    { id: 2, user: 'Sarah Smith', text: 'Yes! They look amazing. Loving the glassmorphism.', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Set up real-time subscription for new chat messages
    const channel = supabase
      .channel('public:messages')
      .on('broadcast', { event: 'new-message' }, (payload) => {
        setMessages((prev) => [...prev, payload.payload as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now(),
      user: 'You', // In a real app, use the logged in user's name
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically add message
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');

    // Broadcast to other clients
    await supabase.channel('public:messages').send({
      type: 'broadcast',
      event: 'new-message',
      payload: msg,
    });
  };

  return (
    <main className="animate-fade-in" style={{ padding: '40px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Talk (Chat + Calls)</h1>
          <p style={{ color: '#9ca3af' }}>General Team Channel (Real-time synced)</p>
        </div>
        <Button variant="primary">📹 Join Call</Button>
      </Card>

      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', marginBottom: '24px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {msg.user[0]}
            </div>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ fontWeight: '600' }}>{msg.user}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{msg.time}</span>
              </div>
              <p style={{ color: '#d1d5db', marginTop: '4px' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </Card>

      <Card style={{ padding: '15px' }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
          <Input 
            type="text" 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" variant="accent">Send</Button>
        </form>
      </Card>
    </main>
  );
}
