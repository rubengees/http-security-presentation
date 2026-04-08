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

Smartsquare Academy 04.2024

---

# Agenda

- CORS
- CSP
- Weitere Header
- HSTS

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
