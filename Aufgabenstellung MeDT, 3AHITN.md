# Aufgabenstellung MEDT, `2021 / 2022 3AHITN`
## Problembeschreibung
Für die Verwaltung von Semesterprüfungen müssen Sie eine Anwendung schreiben, die mit einem zentrales Personenverzeichnis interagiert.

### Screen 1 (Authentification - Screen)
Dieses Screen enthält ein Text - Eingabefeld in welches der Benutzername eingegeben wird und einen "Login" Button. Durch drücken des Login - Buttons wird der Benutzer am Server eingeloggt und - falls erfolgreich - zum zweiten Screen weitergeleitet.

Sie können Sich mit dem Anmeldenamen an der HTL Steyr Domäne (bei mir z.B. prathgeb) anmelden.

Wichtige Requests: `Authentifizierung`

### Screen 2 (Search - Screen)
Dieser Screen enthält ein Eingabefeld, einen "Search" Button sowie einen "Logout" Button. Im Search - Screen können Personennamen eingegeben werden. Nach diesen Personen wird anschließend in der Datenbank gesucht.

Durch drücken des "Search" Buttons wird der Text vom Eingabefeld an den Server geschickt. Anschließend wird die Eingabe gelöscht. Wurde die Person in der Datenbank gefunden, so kommt eine Erfolgsmeldung (`success = true`) sowie die Personendaten retour. Wurde die Person nicht gefunden, so kommt eine Misserfolgsmeldung (`success = false`) retour.


Wurde die Person in der Datenbank gefunden, so wird der Benutzer zum dritten Screen weitergeleitet.
Ist die Person nicht in der Datenbank gefundenw orden, so wird der Benutzer zum vierten Screen weitergeleitet.

Beim Klicken des "Logout" Buttons wird der Benutzer ausgeloggt (Secret wird serverseitig und in der App gelöscht) und der Benutzer zum Authentification - Screen weitergeleitet.

Wichtige Requests: `Suchen von Personen`, `Logout`

### Screen 3 (Results - Screen)
Dieser Screen listet die Suchergebnisse untereinander auf.

### Screen 4 (Add - Screen)
In diesem Screen können neue Personen hinzugefügt werden. Für das Hinzufügen von Personen sind zwei Texteingabefelder notwendig: ein Eingabefeld für den Vornamen, ein Eingabefeld für den Nachnamen. Unterhalb der Eingabefelder befindet sich ein "Save" Button. Beim drücken des "Save" Buttons werden die Daten an den Server geschickt und die Person in die Datenbank eingefügt. Anschließend wird der Benutzer wieder zum Search - Screen weitergeleitet.

Wichtige Requests: `Hinzufügen von Personen`

### Authentifizierung: `GET - Request`
* https://rathgeb.at/persons.php?action=authenticate&username=%IHR_BENUTZERNAME%
* Beispiel: https://rathgeb.at/persons.php?action=authenticate&username=prathgeb
* Ergebnis (Beispiel): `{"success":true,"data":{"id":25,"username":"prathgeb","secret":"b281f394244fb34402aeb3db41ab0047"}}`

### Hinzufügen von Personen: `POST - Request`
* https://rathgeb.at/persons.php?action=add&secret=%IHR_SECRET%&firstname=%VORNAME%&lastname=%NACHNAME%
* https://rathgeb.at/persons.php?action=add&secret=b281f394244fb34402aeb3db41ab0047&firstname=peter&lastname=rathgeb
* Ergebnis (Beispiel): `{"success":true,"data":null}`

### Suchen einer Person:  `GET - Request`
* https://rathgeb.at/persons.php?action=search&secret=%IHR_SECRET%&search=%NAME%
* https://rathgeb.at/persons.php?action=search&secret=b281f394244fb34402aeb3db41ab0047&search=peter%20rathgeb
* Ergebnis bei Erfolg (Beispiel): `{"success": true,"data": {"id": 1,"firstname":"peter","lastname":"rathgeb"}}`
* https://rathgeb.at/persons.php?action=search&secret=b281f394244fb34402aeb3db41ab0047&search=max%20mustermann
* Ergebnis bei Misserfolg (Beispiel): `{"success": false,"data":null}`

### Logout: `GET - Request`
* https://rathgeb.at/persons.php?action=logout&secret=%IHR_SECRET%
* https://rathgeb.at/persons.php?action=logout&secret=b281f394244fb34402aeb3db41ab0047
* Ergebnis (Beispiel): `{"success":true,"data":null}`
