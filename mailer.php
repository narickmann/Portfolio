<?php
// Daten für die Konfiguration
// E-Mail von dir / vom Kunden /////////////////
$mailto      = 'nadine.rickmann@mail.de';    //
$mailSubject = 'Nachricht vom Portfolio Formular'; //
/////////////////////////////////////////////
$mailFrom    = 'nadine.rickmann@mail.de';
$mailContent = '';
// Formulardaten einlesen und Mail daraus erstellen
if ( isset( $_POST ) ) {
    foreach ( $_POST as $name => $value ) {
        $mailContent .= $name . ": " . $value . "\n";
    }
}
// Verändert, um Umlaute sauber abzubilden 
$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=utf-8";
$headers[] = "From: {$mailFrom}";

// E-Mail versenden
$mailSent = mail( $mailto, $mailSubject, $mailContent,implode("\r\n",$headers) );
// E-Mail-Versand überprüfen und Bestätigungs-/ Fehlermodal aufrufen
if ($mailSent) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
exit();
?>
