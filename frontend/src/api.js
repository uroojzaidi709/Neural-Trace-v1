const BASE_URL = "http://localhost:8000"

const getToken = () => localStorage.getItem("token")

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    return response.json()
}

export const registerUser = async (fullName, email, password, role = "citizen") => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            full_name: fullName,
            email:     email,
            password:  password,
            role:      role
        })
    })
    return response.json()
}

export const getMe = async () => {
    const response = await fetch(`${BASE_URL}/auth/me?token=${getToken()}`)
    return response.json()
}

export const getThreatStats = async () => {
    const response = await fetch(`${BASE_URL}/threats/stats`)
    return response.json()
}

export const getThreatsList = async (limit = 50) => {
    const response = await fetch(`${BASE_URL}/threats/?limit=${limit}`)
    return response.json()
}

export const getThreatDistribution = async () => {
    const response = await fetch(`${BASE_URL}/threats/distribution`)
    return response.json()
}

export const getLiveMap = async () => {
    const response = await fetch(`${BASE_URL}/threats/live-map`)
    return response.json()
}

export const getThreatById = async (id) => {
    const response = await fetch(`${BASE_URL}/threats/${id}`)
    return response.json()
}

export const ingestThreat = async (data) => {
    const response = await fetch(`${BASE_URL}/threats/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const lookupIP = async (ip) => {
    const response = await fetch(`${BASE_URL}/ip/lookup/${ip}`)
    return response.json()
}

export const getMLHealth = async () => {
    const response = await fetch(`${BASE_URL}/ml/health`)
    return response.json()
}

export const classifyAttack = async (features) => {
    const response = await fetch(`${BASE_URL}/ml/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features)
    })
    return response.json()
}

export const generateReport = async (attackId) => {
    const response = await fetch(`${BASE_URL}/forensics/generate/${attackId}`, {
        method: "POST"
    })
    return response.json()
}

export const getForensicReports = async () => {
    const response = await fetch(`${BASE_URL}/forensics/`)
    return response.json()
}

export const getDownloadURL = (reportId) => {
    return `${BASE_URL}/forensics/${reportId}/download`
}