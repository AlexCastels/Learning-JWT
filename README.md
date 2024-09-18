# Learning-JWT
-L'idea è di utilizzare un token univoco creato con JWT e temporaneo storato in un cookie per dare accesso all'utente
-La password viene criptata per essere storata nel DB senza il rischio di essere compromessa

# JWT
JWT è suddiviso in un header che sono le specifiche per generare il token, e un Payload che contiene i dati dati da associare
al token, come id, nome utente, ecc, entrambi sono obj ed entrambi permettono di generare il token univoco in base ai dati contenuti, il token altro non è che una stringa alfanumerica complessa

Headers:
Contiene i metadata per come genereare il token

Payload:
usato per identificare l'utente e associare il token

Signature:
Garantisce la sicurezza del token

Secret:
è una chiave segreta conservata nel nostro codice per poter avviare il processo, deve essere storata in .env