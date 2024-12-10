# Portfolio

**📜 Beschreibung:**  
Mein Portfolio, in dem ich grundlegende Webtechniken vertieft habe, wie die Strukturierung eines Projekts, DOM-Manipulation, Event-Handler und die Arbeit mit `.json`-Dateien. Das Projekt enthält auch ein Kontaktformular, das über `mailer.php` funktioniert, jedoch keine externen Bibliotheken verwendet, außer für Icons.

## ⚙️ Status
**Projekt im Rahmen eines JS-Kurses**
Dieses Projekt wurde innerhalb eines JavaScript-Kurses erstellt. Das Projekt wurde in einer Woche entwickelt und stellt den aktuellen Stand des Projekts dar.

Das Projekt ist noch **Work-in-Progress** und wird in der Zukunft weiterentwickelt.
- Aktuell fehlt noch die vollständige **Responsivität** für kleinere Geräte. Die Seite ist derzeit nicht optimal auf allen Bildschirmgrößen dargestellt.

### Geplante Änderungen und Verbesserungen

- **Responsivität:** Die Seite wird auf mobilen Geräten derzeit nicht optimal dargestellt. In Zukunft wird das Design für verschiedene Bildschirmgrößen optimiert.
- **Design-Optimierungen:** Weitere Anpassungen an der Benutzeroberfläche, um das Design zu verbessern und benutzerfreundlicher zu gestalten.

## 🔧 Technologien und Features
- **Projektstruktur:** Organisierte Struktur aus HTML, CSS, JavaScript und weiteren Ressourcen wie Bildern und Schriften.
- **DOM-Manipulation:** Interaktive Elemente, die mit JavaScript erstellt und bearbeitet werden.
- **Event-Handler:** Verarbeitung von Benutzerinteraktionen wie Klicks und Eingaben.
- **Daten aus `.json`-Dateien:** Dynamisches Laden und Verarbeiten von Inhalten.
- **Formularvalidierung:** Einfache Validierung von Formulardaten, ohne Backend-Integration (außer für das Kontaktformular).
- **Icons:** Verwendung von Icons aus der FontAwesome-Bibliothek.
- **Kein Framework:** Das Projekt wurde ohne externe JavaScript-Frameworks entwickelt.

## Projektstruktur

```plaintext
portfolio/
  ├── assets/
  │   ├── css/                # Enthält die CSS-Dateien
  │   ├── fonts/              # Schriftarten
  │   ├── img/                # Bilder und Grafiken
  │   ├── js/                 # JavaScript-Dateien
  ├── data/                   # .json Dateien für dynamischen Inhalt
  ├── Favicon.ico             # Favicon für die Website
  ├── index.html              # Haupt-HTML-Datei
  ├── Lebenslauf_Nadine_Rickmann.pdf  # PDF (leere Datei)
  ├── mailer.php              # PHP-Datei zum Senden von Formularen
  ├── README.md               # Diese Datei
  ├── robots.txt              # Anweisungen für Web-Crawler
  ├── sitemap.xml             # Sitemap für Suchmaschinen
```

## Nutzung

1. **Klone das Repository:**
   ```bash
   git clone https://github.com/narickmann/portfolio.git
   ```

2. **Starten des Projekts:**
   - Nutze einen lokalen Server, wie **LiveServer** in Visual Studio Code, um die Seite korrekt anzuzeigen (insbesondere für JavaScript und dynamische Inhalte).

3. **Kontaktformular (optional):**
   - Das Kontaktformular sendet eine Nachricht über die `mailer.php`-Datei (benötigt PHP-Unterstützung auf deinem Webserver).  
   - Achte darauf, dass der Server PHP unterstützt, um das Formular korrekt zu verwenden. Das Formular zeigt eine Bestätigungsmeldung an, wenn die Nachricht erfolgreich gesendet wurde, ansonsten eine Fehlerbenachrichtigung.

## Lizenz

Dieses Projekt ist unter der [ISC-Lizenz](./LICENSE) lizenziert.