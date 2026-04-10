---
title: Http Security
info: |
drawings:
  persist: false
transition: slide-left
comark: true
duration: 60min
---

# HTTP Security

Smartsquare Academy 04.2026

---

# Agenda

- CORS
- CSP
- CSRF
- HSTS
- Weitere Header
- Integrationen

---

# CORS

<img src="/assets/cors-meme.jpg" alt="CORS meme" style="height: inherit; width: 100%; object-fit: contain;" />

---

# CORS

- Steht für "Cross-Origin Resource Sharing"
- Verhindert den Aufruf von "fremden" Servern insofern sie keine Erlaubnis geben
- Nur in Browser-Umgebungen relevant, nicht auf Servern

---

# CORS

- "Einfache" Anfragen werden normal geschickt und nachträglich abgelehnt, wenn Header fehlen
  - Einfach ist eine Anfrage, wenn es ein GET, HEAD oder POST ist und nur eine kleine Menge an ausgewählten Headern gesetzt ist.
- Andere Anfragen lösen erst eine Preflight-OPTIONS Anfrage aus die vorher die Erlaubnis prüft
- Die `Access-Control-Allow-*` Header steuern die Erlaubnis

---

# CORS - Interaktives Beispiel

<Cors />

---

# CSP

- Steht für "Content-Security-Policy"
- Steuert hauptsächlich welche Ressourcen (Scripte, Styles, …) von wo geladen werden dürfen
  - Schutz vor XSS-Angriffen
  - Zusätzlich gibt es noch weitere Einstellungen wie das Upgrade von HTTP-Anfragen auf HTTPS
- Konfiguration über einen Header oder im `<meta>`-Element

---

# CSP

- Einstellungen werden von `default-src` vererbt
  - Möglichst restriktiv einstellen und dann für bestimmte Ressourcen Ausnahmen hinzufügen
  - Für bestehende Anwendungen nach und nach die nötigen Ausnahmen hinzufügen

```
Content-Security-Policy: default-src 'self'; img-src 'self' example.com
```

---

# CSP - upgrade-insecure-requests

- Alle HTTP-Anfragen werden automatisch auf HTTPS umgestellt
- Verhindert das versehentliche Laden von unsicheren Ressourcen

```
Content-Security-Policy: [...]; upgrade-insecure-requests;
```

---

# CSP - Beispiel ServiceBuddy

```
default-src 'self' https://fra1.digitaloceanspaces.com https://*.mapbox.com https://*.stream-io-video.com
            https://*.stream-io-api.com https://*.azurewebsites.net wss://*.stream-io-api.com
            wss://*.stream-io-video.com https://auth.servicebuddy.de;
base-uri 'none';
font-src 'self' https: data:;
form-action 'self';
frame-ancestors 'self';
img-src 'self' data: blob: https://fra1.digitaloceanspaces.com;
object-src 'none';
script-src-attr 'none';
style-src 'self' https: 'unsafe-inline';
script-src 'self' https: 'unsafe-inline' 'strict-dynamic' 'nonce-guRyucFUGTV1dVYaI23FfKPB';
upgrade-insecure-requests;
```

---

# CSP - Beispiel GitHub

```http
default-src 'none';
base-uri 'self';
child-src github.githubassets.com github.com/assets-cdn/worker/ github.com/assets/ gist.github.com/assets-cdn/worker/;
connect-src 'self' uploads.github.com www.githubstatus.com collector.github.com raw.githubusercontent.com
            [...]
            api.individual.githubcopilot.com api.business.githubcopilot.com api.enterprise.githubcopilot.com;
font-src github.githubassets.com;
form-action 'self' github.com gist.github.com copilot-workspace.githubnext.com objects-origin.githubusercontent.com;
frame-ancestors 'none';
frame-src viewscreen.githubusercontent.com notebooks.githubusercontent.com;
img-src 'self' data: blob: github.githubassets.com media.githubusercontent.com camo.githubusercontent.com
        [...]
        images.ctfassets.net/8aevphvgewt8/;
manifest-src 'self';
media-src github.com user-images.githubusercontent.com secured-user-images.githubusercontent.com
          [...]
          github.githubassets.com assets.ctfassets.net/8aevphvgewt8/ videos.ctfassets.net/8aevphvgewt8/;
script-src github.githubassets.com;
script-src github.githubassets.com;
style-src 'unsafe-inline' github.githubassets.com;
upgrade-insecure-requests;
worker-src github.githubassets.com github.com/assets-cdn/worker/ github.com/assets/ gist.github.com/assets-cdn/worker/
```

---

# CSP – Interaktives Beispiel

<Csp />

---

# CSP – Interaktives Beispiel

<UpgradeInsecureRequests />

---

# CSP - Reporting

- Verstöße gegen die CSP können an einen Server gemeldet werden, um Probleme zu erkennen und zu beheben
- Dazu muss die `report-uri` oder `report-to` Direktive gesetzt werden

```
Reporting-Endpoints: endpoint="https://example.com/csp-reports"
Content-Security-Policy: default-src 'self'; report-to endpoint
```

#### Beispiel eines CSP-Reportings (gekürzt)

```json
{
  "age": 53531,
  "body": {
    "blockedURL": "inline",
    "effectiveDirective": "script-src-elem",
    "originalPolicy": "default-src 'self'; report-to endpoint",
    "statusCode": 200
  },
  "type": "csp-violation",
  "url": "https://example.com/csp-report",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
}
```

---

# CSRF

- Steht für "Cross-Site Request Forgery"
- Angreifer lockt Nutzer auf eine bösartige Seite, die dann im Hintergrund Anfragen an eine vertrauenswürdige Seite
  sendet, auf der der Nutzer eingeloggt ist
- Für uns meistens nicht relevant, da wir keine Cookies verwenden
- Ansonsten: Schutz durch CSRF-Token, SameSite-Cookies oder `Sec-Fetch-Site` Header

```html
<form action="https://my-bank.example.org/transfer" method="POST">
  <input type="hidden" name="recipient" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
```

---

# HSTS

- Steht für "HTTP Strict Transport Security"
- Erzwingt die Nutzung von HTTPS, auch wenn HTTP angefragt wird

```
Strict-Transport-Security: max-age=31536000; includeSubDomains;
```

---

# HSTS - Preload List

- Browser haben eine Liste von Domains die automatisch auf HTTPS umgestellt werden, auch wenn sie nicht erreichbar sind
- Unter [https://hstspreload.org](https://hstspreload.org) können Domains zur Aufnahme in diese Liste eingereicht werden
- Voraussetzungen:
  - Domain muss über HTTPS erreichbar sein.
  - Weiterleitung von HTTP auf HTTPS muss eingerichtet sein.
  - HSTS Header mit `max-age` von mindestens einem Jahr, `includeSubDomains` und `preload` muss gesetzt sein.

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload;
```

---

# Verschiedene Header

- `Permissions-Policy` - steuert den Zugriff auf Browser-APIs

  ```
  Permissions-Policy: geolocation=(self https://trusted-ad-network.com), microphone=()
  ```

- `Cross-Origin-Embedder-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` - steuern die Isolation
  von Ressourcen, ähnlich wie CSP, aber auf andere Aspekte bezogen

  ```
  Cross-Origin-Embedder-Policy: credentialless
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  ```

- `Referrer-Policy` - steuert welche Informationen über die Herkunft einer Anfrage mitgeschickt werden

  ```
  Referrer-Policy: no-referrer
  ```

- `X-Content-Type-Options` - verhindert das "MIME Sniffing" und erzwingt die Einhaltung des angegebenen Content-Types

  ```
  X-Content-Type-Options: nosniff
  ```

---

# Verschiedene Header

- `X-Frame-Options` - verhindert das Einbetten der Seite in einen Frame, um Clickjacking-Angriffe zu verhindern

  <iframe src="/clickjacking.html" height="86" style="margin-bottom: 12px"></iframe>

  ```
  X-Frame-Options: DENY
  ```

- `X-XSS-Protection` - aktiviert die integrierte XSS-Schutzfunktion des Browsers (veraltet, nicht mehr empfohlen)

  ```
  X-XSS-Protection: 1; mode=block
  ```

---

# Integrationen

- Header manuell setzen, beispielsweise in der nginx.conf

  ```
  add_header Content-Security-Policy "default-src 'self'; img-src 'self' example.com";
  ```

- Für Node.js: [Helmet](https://www.npmjs.com/package/helmet)
- Für Nuxt.js: [nuxt-security](https://nuxt.com/modules/security)
- Für Spring: [Spring Security](https://docs.spring.io/spring-security/reference/features/exploits/headers.html)
