import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const CIPHER_MESSAGE = "ПОДАРОК ЖДЕТ В ТОМ МЕСТЕ, ГДЕ ТЫ МЕНЯЕШЬ СЕБЯ";
const HIDDEN_CHARS = [0, 7, 15, 19, 26, 33, 38, 43];

const Index = () => {
  const [userInput, setUserInput] = useState<string[]>(Array(CIPHER_MESSAGE.length).fill(''));
  const [solved, setSolved] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}д ${hours}ч ${minutes}м ${seconds}с`);

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('ВРЕМЯ ВЫШЛО');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newInput = [...userInput];
    newInput[index] = value.toUpperCase();
    setUserInput(newInput);

    let correctCount = 0;
    CIPHER_MESSAGE.split('').forEach((char, i) => {
      if (HIDDEN_CHARS.includes(i)) {
        if (newInput[i] === char) correctCount++;
      }
    });

    if (correctCount === HIDDEN_CHARS.length) {
      setSolved(true);
    }
  };

  const renderMessage = () => {
    return CIPHER_MESSAGE.split('').map((char, index) => {
      if (HIDDEN_CHARS.includes(index)) {
        return (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={userInput[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-8 h-10 text-center text-xl font-bold bg-card border-primary neon-border mx-0.5 inline-block"
            disabled={solved}
          />
        );
      }
      return (
        <span key={index} className="text-2xl font-bold neon-text inline-block mx-0.5">
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen scanline relative overflow-hidden bg-gradient-to-b from-background via-card to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-primary glitch mb-4">
            ZENLESS
          </h1>
          <div className="text-3xl md:text-5xl font-bold text-secondary">
            ZONE ZERO
          </div>
        </div>

        <div className="w-full max-w-4xl bg-card/50 backdrop-blur-sm border-2 border-primary/50 neon-border rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Icon name="Timer" className="text-primary" size={28} />
              <span className="text-2xl font-bold text-primary">{timeLeft}</span>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Icon name={audioPlaying ? 'Volume2' : 'VolumeX'} size={24} />
            </Button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground flex items-center justify-center gap-3">
              <Icon name="Lock" className="text-secondary" size={32} />
              РАСШИФРУЙ СООБЩЕНИЕ
            </h2>
            
            <div className="flex flex-wrap justify-center gap-1 p-6 bg-background/50 rounded-lg border border-primary/30">
              {renderMessage()}
            </div>
          </div>

          {solved && (
            <div className="bg-secondary/20 border-2 border-secondary magenta-glow rounded-lg p-6 animate-pulse">
              <div className="flex items-center justify-center gap-3 text-3xl font-bold text-secondary">
                <Icon name="CheckCircle" size={40} />
                КОД ВЗЛОМАН!
              </div>
              <p className="text-center text-xl text-foreground mt-4">
                Теперь ты знаешь, где искать подарок...
              </p>
            </div>
          )}

          {!solved && (
            <div className="text-center text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <Icon name="Info" size={20} />
                Подставь правильные буквы в пустые ячейки
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 text-center max-w-2xl w-full">
          <div className="bg-card/30 border border-primary/30 rounded-lg p-4">
            <Icon name="Zap" className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-sm text-muted-foreground">Киберпанк</div>
          </div>
          <div className="bg-card/30 border border-secondary/30 rounded-lg p-4">
            <Icon name="Puzzle" className="mx-auto mb-2 text-secondary" size={32} />
            <div className="text-sm text-muted-foreground">Головоломка</div>
          </div>
          <div className="bg-card/30 border border-primary/30 rounded-lg p-4">
            <Icon name="Gift" className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-sm text-muted-foreground">Подарок</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
