"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"

interface Candidate {
  id: string
  number: string
  name: string
  party: string
  photo: string
}

const candidates: Candidate[] = [
  {
    id: "1",
    number: "13",
    name: "Luis Inacio Lula da Silva",
    party: "Partido dos trabalhadores",
    photo: "lula.jpeg?height=150&width=120",
  },
  {
    id: "2",
    number: "45",
    name: "Ciro Gomes",
    party: "Partido da Nação",
    photo: "/ciro.png?height=150&width=120",
  },
  {
    id: "3",
    number: "22",
    name: "Bolsonaro",
    party: "Partido Liberal",
    photo: "/bolsonaro.webp?height=150&width=120",
  },
]

interface ConfirmationScreenProps {
  selectedCandidate: string | null
  onBack: () => void
  onSubmit: () => void
}

export default function ConfirmationScreen({ selectedCandidate, onBack, onSubmit }: ConfirmationScreenProps) {
  const candidate = candidates.find((c) => c.id === selectedCandidate)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Confirme seu voto</h2>

      <div className="border rounded-lg p-4 mb-6">
        {candidate ? (
          <div className="flex items-center space-x-4">
            <img
              src={candidate.photo || "/placeholder.svg"}
              alt={candidate.name}
              className="w-24 h-32 object-cover rounded"
            />
            <div>
              <div className="text-lg font-bold">{candidate.name}</div>
              <div className="text-sm text-gray-600">{candidate.party}</div>
              <div className="text-sm font-medium mt-1">Número: {candidate.number}</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-lg font-bold">VOTO NULO</div>
            <div className="text-sm text-gray-600">Você optou por anular seu voto</div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" className="border-2 border-gray-500" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={onSubmit}>
          <Check className="mr-2 h-4 w-4" /> Confirmar Voto
        </Button>
      </div>
    </div>
  )
}

