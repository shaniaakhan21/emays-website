import Nav from '../common/Nav';
import HomeSection from './HomeSection';
import ShopWithUs from './ShopWithUs';
import Environment from './Environment';
import Services from './Services';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';
import Footer from '../common/Footer';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CustomerHome = ({
    withoutNav,
    ...props
}) => {

    const [translate] = useTranslation();

    const t = useCallback((str) => translate(`privacy.${str}`), [translate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav refs={props.refs}/>
            <div className='privacy'>
                <h1>{t('title')}</h1>

                <div className='section'>
                    <h3>1. Oggetto</h3>
                    <p>Le presenti Condizioni di utilizzo (“<strong>Condizioni di Utilizzo</strong>”) hanno per oggetto
                        le condizioni generali per l'utilizzo del sito web (il “<strong>Sito</strong>”) e/o
                        l’applicazione mobile (“<strong>App.</strong>”), di proprietà della società Emays s.r.l., con
                        sede legale in Corso Italia 22, 20122 Milano (MI), C.F. 1260201010964, iscritta al registro
                        delle Imprese di Milano Monza Brianza al R.E.A. MI –
                        2671764, (“Emays”), messe a disposizione degli utenti tramite un apposito app store o
                        altrimenti, in qualità di ospiti o di utenti registrati. Si prega di leggere attentamente le
                        presenti Condizioni di Servizio prima di iniziare ad utilizzare il Sito o la App. Con l’accesso
                        al Sito o con l’utilizzo della App. l’utente dichiara di accettare le presenti Condizioni di
                        Utilizzo e si impegna a rispettarle. In caso di disaccordo con quanto previsto nelle presenti
                        Condizioni di Utilizzo si prega di non navigare nel Sito e di non utilizzare la App..</p>
                </div>

                <div className='section'>
                    <h3>2. Accesso</h3>
                    <p>L’accesso al Sito e alla App. sono consentiti su base temporanea e Emays si riserva il diritto di
                        escludere o modificare l’accesso al Sito o alla App. senza. Emays non risponde della mancata
                        disponibilità del Sito o della App., qualunque ne sia la ragione e in qualsiasi momento o per
                        qualsiasi periodo di tempo si sia verificata. In alcune occasioni Emays può limitare l’accesso
                        degli utenti, anche se registrati, al Sito o alla App. ovvero solo ad alcune parti di essi.
                        L'utente è obbligato a mantenere riservati i propri dati di login così come tutta l'attività che
                        si svolge nell'ambito del proprio Account. Qualora l'utente abbia motivo di preoccupazione
                        riguardo ai propri dati di login o ritenga che siano stati oggetto di un utilizzo improprio è
                        pregato di informare senza indugio Emays tramite l'indirizzo: info@emaysstyle.com. Emays ha
                        facoltà di disattivare l'Account dell'utente in qualsiasi momento, senza pregiudizio per i
                        diritti degli utenti.</p>
                </div>

                <div className='section'>
                    <h3>3. Uso consentito</h3>
                    <p>Il Sito o la App. non possono essere utilizzati con modalità che costituiscano una violazione di
                        legge o regolamenti in ambito nazionale o internazionale né possono essere utilizzati per
                        inviare, ricevere consapevolmente, caricare (upload), scaricare (download), utilizzare o
                        riutilizzare qualsiasi materiale non conforme alla legge. L'utente inoltre si impegna a non
                        accedere al Sito o alla App. senza averne il diritto e a non danneggiare o manomettere il Sito o
                        la App..</p>
                </div>

                <div className='section'>
                    <h3>4. Sospensione e Cancellazione</h3>
                    <p>Il mancato rispetto dell'articolo 3 (Uso consentito) costituisce grave inadempimento e può
                        comportare l’adozione da parte di Emays di una o più misure tra quelle di seguito indicate:
                    <ul>
                        <li>immediata sospensione, in via temporanea o permanente, dell’accesso;</li>
                        <li>cancellazione definitiva dell’Account;</li>
                        <li>segnalazione alla Pubblica Autorità in caso di atti illeciti.</li>
                    </ul>
                        L’elenco non è esaustivo ed Emays può adottare qualsiasi altra iniziativa che ritenga
                        appropriata.
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CustomerHome;
