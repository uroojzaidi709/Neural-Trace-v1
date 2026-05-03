from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(prefix="/ip", tags=["IP Intelligence"])


@router.get("/lookup/{ip_address}")
def lookup_ip(ip_address: str):

    try:
        response = requests.get(
            f"http://ip-api.com/json/{ip_address}",
            timeout=5
        ).json()

        if response.get('status') == 'fail':
            raise HTTPException(
                status_code=400,
                detail="Invalid IP address"
            )

        isp = response.get('isp', '').lower()
        org = response.get('org', '').lower()

        risk_score = 3.0

        suspicious_keywords = [
            'tor', 'vpn', 'proxy', 'hosting',
            'datacenter', 'digital ocean', 'linode',
            'vultr', 'amazon aws', 'anonymous'
        ]

        for keyword in suspicious_keywords:
            if keyword in isp or keyword in org:
                risk_score += 3.0
                break

        high_risk_countries = ['CN', 'RU', 'KP', 'IR', 'NG']
        if response.get('countryCode') in high_risk_countries:
            risk_score += 2.0

        risk_score = min(risk_score, 10.0)

        if risk_score >= 7.0:
            risk_level = "HIGH"
            threat_status = "DANGEROUS"
        elif risk_score >= 4.0:
            risk_level = "MEDIUM"
            threat_status = "SUSPICIOUS"
        else:
            risk_level = "LOW"
            threat_status = "SAFE"

        return {
            "ip": ip_address,
            "country": response.get('country', 'Unknown'),
            "country_code": response.get('countryCode', 'XX'),
            "city": response.get('city', 'Unknown'),
            "isp": response.get('isp', 'Unknown'),
            "organization": response.get('org', 'Unknown'),
            "latitude": response.get('lat', 0),
            "longitude": response.get('lon', 0),
            "risk_score": round(risk_score, 1),
            "risk_level": risk_level,
            "threat_status": threat_status
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"IP lookup failed: {str(e)}"
        )