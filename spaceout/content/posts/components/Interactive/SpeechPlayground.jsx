import React, { useEffect, useRef, useState } from 'react';
import './SpeechPlayground.css';

const BAR_COUNT = 24;
const MIN_BAR_PERCENT = 6;

export default function SpeechPlayground() {
  const [text, setText] = useState('Hello! This is your browser speaking.');
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState('');
  const [mounted, setMounted] = useState(false);
  const recognitionRef = useRef(null);
  const barRefs = useRef([]);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const recognitionAvailable =
    mounted &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const synthesisAvailable =
    mounted &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;
  const visualizerAvailable =
    mounted &&
    Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) &&
    Boolean(window.AudioContext || window.webkitAudioContext);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      stopVisualizer();
    };
  }, []);

  function resetBars() {
    barRefs.current.forEach((bar) => {
      if (bar) bar.style.height = `${MIN_BAR_PERCENT}%`;
    });
  }

  async function startVisualizer() {
    if (!visualizerAvailable) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      micStreamRef.current = stream;
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const step = Math.max(1, Math.floor(data.length / BAR_COUNT));

      const draw = () => {
        analyser.getByteFrequencyData(data);
        barRefs.current.forEach((bar, index) => {
          if (!bar) return;
          const value = data[index * step] || 0;
          const percent = Math.max(MIN_BAR_PERCENT, (value / 255) * 100);
          bar.style.height = `${percent}%`;
        });
        animationFrameRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch (error) {
      setStatus(`Microphone visualizer unavailable: ${error.message}`);
    }
  }

  function stopVisualizer() {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    resetBars();
  }

  function toggleListening() {
    if (listening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      stopVisualizer();
      return;
    }
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const words = Array.from(
        event.results,
        (result) => result[0].transcript,
      ).join(' ');
      setTranscript(words);
    };
    recognition.onerror = (event) =>
      setStatus(`Recognition error: ${event.error}`);
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      stopVisualizer();
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
      setStatus('Listening…');
      startVisualizer();
    } catch (error) {
      setStatus(`Could not start recognition: ${error.message}`);
      recognitionRef.current = null;
    }
  }

  function speak() {
    if (!synthesisAvailable || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.onend = () => setStatus('Finished speaking.');
    utterance.onerror = () => setStatus('Speech playback failed.');
    window.speechSynthesis.speak(utterance);
    setStatus('Speaking…');
  }

  return (
    <section className="sp-widget" aria-label="Browser speech playground">
      <p className="sp-caption">
        Speech recognition may ask for microphone permission. Its availability
        and processing depend on your browser; avoid dictating sensitive
        information.
      </p>

      <div className="sp-section">
        <span className="sp-section-label">Speech recognition</span>
        {recognitionAvailable ? (
          <button
            type="button"
            className="sp-button"
            aria-pressed={listening}
            onClick={toggleListening}
          >
            {listening ? 'Stop listening' : 'Start listening'}
          </button>
        ) : (
          <p className="sp-hint">
            Speech recognition isn't available in this browser. You can still
            try text to speech if supported.
          </p>
        )}
      </div>

      {recognitionAvailable && (
        <div
          className={`sp-visualizer${listening ? ' sp-visualizer-live' : ''}`}
          aria-hidden="true"
        >
          {Array.from({ length: BAR_COUNT }).map((_, index) => (
            <span
              key={index}
              className="sp-bar"
              ref={(el) => (barRefs.current[index] = el)}
            />
          ))}
        </div>
      )}

      <div className="sp-transcript">
        <span className="sp-transcript-label">Transcript</span>
        <span className="sp-transcript-text" aria-live="polite">
          {transcript || 'Nothing captured yet.'}
        </span>
      </div>

      {transcript && (
        <div className="sp-section">
          <button
            type="button"
            className="sp-button sp-button-ghost"
            onClick={() => setText(transcript)}
          >
            Use transcript as text
          </button>
        </div>
      )}

      <div className="sp-field">
        <span className="sp-section-label">
          <label htmlFor="speech-playground-text">Text to read aloud</label>
        </span>
        <textarea
          id="speech-playground-text"
          className="sp-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
        />
      </div>

      <div className="sp-rate-row">
        <label className="sp-rate-label" htmlFor="speech-playground-rate">
          Rate: {rate.toFixed(1)}×
        </label>
        <input
          id="speech-playground-rate"
          className="sp-range"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          disabled={!synthesisAvailable}
        />
      </div>

      {synthesisAvailable ? (
        <div className="sp-controls">
          <button
            type="button"
            className="sp-button"
            onClick={speak}
            disabled={!text.trim()}
          >
            Speak
          </button>
          <button
            type="button"
            className="sp-button sp-button-ghost"
            onClick={() => window.speechSynthesis.cancel()}
          >
            Stop speaking
          </button>
        </div>
      ) : (
        <p className="sp-hint">
          Text to speech isn't available in this browser.
        </p>
      )}

      <p className="sp-status" role="status">
        {status}
      </p>
    </section>
  );
}
