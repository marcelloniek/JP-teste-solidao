"use client";

import { useState } from 'react';

const perguntas = [
  "周囲に人がいても孤独感や疎外感を頻繁に感じる。",
  "親密で意味のある人間関係を作ったり維持したりするのが難しい。",
  "誰と一緒にいても、常に感情的な空虚感や見捨てられた感覚を経験する。",
  "自分の深い考えや感情、悩みを共有できる人が誰もいないと感じる。",
  "持続的な孤独感により自尊心や自信が影響を受けている。",
  "最近、自分の人生には価値がなく、何か悪いことが起きても誰も気にしないだろうと思ったことがある。", // FLAG
  "拒絶や自分の不適切さを恐れて、社会的状況や交流の機会を避けることが多い。",
  "感情的に心を開いたり、人を信頼することに大きな困難を感じる。",
  "孤独感を和らげるために、過度な飲酒、薬物使用、極端な孤立など、不健全な対処法を取っている。",
  "頻繁な孤独感のため、感情的、身体的、精神的な健康が悪化している。"
];

export default function TesteSolidao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">孤独感テスト</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">結果: {resultado}</h2>
          {resultado === "緑" && <p>あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>}
          {resultado === "黄" && <p>取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>}
          {resultado === "赤" && <p>この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
        </>
      )}
    </div>
  );
}
