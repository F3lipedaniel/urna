"use client"

import { useState } from "react"
import VotingScreen from "@/components/voting-screen"
import ConfirmationScreen from "@/components/confirmation-screen"
import CompletionScreen from "@/components/completion-screen"

export default function VotingMachine() {
  const [stage, setStage] = useState<"voting" | "confirmation" | "completion">("voting")
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [voterNumber, setVoterNumber] = useState<string>("")

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId)
  }

  const handleConfirm = () => {
    setStage("confirmation")
  }

  const handleBack = () => {
    setStage("voting")
  }

  const handleSubmit = () => {
    // In a real application, you would send the vote to a server here
    setStage("completion")

    // Reset after 5 seconds
    setTimeout(() => {
      setStage("voting")
      setSelectedCandidate(null)
      setVoterNumber("")
    }, 5000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-green-700 p-4 text-white text-center">
          <h1 className="text-2xl font-bold">Urna Eletrônica</h1>
        </div>

        {stage === "voting" && (
          <VotingScreen
            voterNumber={voterNumber}
            setVoterNumber={setVoterNumber}
            selectedCandidate={selectedCandidate}
            onCandidateSelect={handleCandidateSelect}
            onConfirm={handleConfirm}
          />
        )}

        {stage === "confirmation" && (
          <ConfirmationScreen selectedCandidate={selectedCandidate} onBack={handleBack} onSubmit={handleSubmit} />
        )}

        {stage === "completion" && <CompletionScreen />}
      </div>
    </main>
  )
}

