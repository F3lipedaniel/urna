"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"

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

interface VotingScreenProps {
  voterNumber: string
  setVoterNumber: (value: string) => void
  selectedCandidate: string | null
  onCandidateSelect: (candidateId: string) => void
  onConfirm: () => void
}

export default function VotingScreen({
  voterNumber,
  setVoterNumber,
  selectedCandidate,
  onCandidateSelect,
  onConfirm,
}: VotingScreenProps) {
  const [candidateNumber, setCandidateNumber] = useState("")
  const [showCandidateInfo, setShowCandidateInfo] = useState(false)

  const handleNumberInput = (value: string) => {
    if (value.length <= 2) {
      setCandidateNumber(value)

      if (value.length === 2) {
        const candidate = candidates.find((c) => c.number === value)
        if (candidate) {
          onCandidateSelect(candidate.id)
          setShowCandidateInfo(true)
        } else {
          onCandidateSelect("")
          setShowCandidateInfo(true)
        }
      } else {
        setShowCandidateInfo(false)
        onCandidateSelect("")
      }
    }
  }

  const handleKeypadClick = (digit: string) => {
    handleNumberInput(candidateNumber + digit)
  }

  const handleClear = () => {
    setCandidateNumber("")
    setShowCandidateInfo(false)
    onCandidateSelect("")
  }

  const selectedCandidateData = candidates.find((c) => c.id === selectedCandidate)

  return (
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Título de Eleitor</label>
        <Input
          type="text"
          value={voterNumber}
          onChange={(e) => setVoterNumber(e.target.value)}
          placeholder="Digite seu título de eleitor"
          className="mb-4"
          maxLength={12}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="border rounded p-4 mb-4 h-32 flex items-center justify-center">
            {showCandidateInfo ? (
              candidateNumber.length === 2 && selectedCandidateData ? (
                <div className="text-center">
                  <div className="text-2xl font-bold">{candidateNumber}</div>
                  <div className="text-sm">{selectedCandidateData.name}</div>
                  <div className="text-xs text-gray-500">{selectedCandidateData.party}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold">{candidateNumber}</div>
                  <div className="text-sm text-red-500">VOTO NULO</div>
                </div>
              )
            ) : (
              <div className="text-2xl font-bold">{candidateNumber || "_ _"}</div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
              <Button
                key={digit}
                variant="outline"
                className="h-12 text-lg font-bold"
                onClick={() => handleKeypadClick(digit.toString())}
              >
                {digit}
              </Button>
            ))}
          </div>
        </div>

        <div>
          {showCandidateInfo && selectedCandidateData ? (
            <img
              src={selectedCandidateData.photo || "/placeholder.svg"}
              alt={selectedCandidateData.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-2">
              <span className="text-gray-500">Foto do candidato</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleClear}
            >
              <X className="mr-2 h-4 w-4" /> CORRIGE
            </Button>
            <Button
              variant="outline"
              className="h-12 bg-white border-2 border-green-500 text-green-500 hover:bg-green-50"
              onClick={onConfirm}
              disabled={!showCandidateInfo}
            >
              <Check className="mr-2 h-4 w-4" /> CONFIRMA
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">Simulação de urna eletrônica para fins educativos</div>
    </div>
  )
}

