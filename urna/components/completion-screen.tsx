import { CheckCircle } from "lucide-react"

export default function CompletionScreen() {
  return (
    <div className="p-8 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Voto Registrado!</h2>
      <p className="text-gray-600 mb-6">Seu voto foi computado com sucesso.</p>
      <div className="text-sm text-gray-500">Esta tela será fechada automaticamente em alguns segundos.</div>
    </div>
  )
}

