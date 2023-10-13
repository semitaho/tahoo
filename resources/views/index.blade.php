@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/index.css') }}" rel="stylesheet"/>
@endsection
@section('sidebar', 'kukkaa')
@section('title', 'Tehokasta ohjelmistokonsultointia yli 10 vuoden kokemuksella')
@section('content')

    <h2>Yritykseni</h2>
    <p>Taho Ohjelmistopalvelut Oy on 2018 perustamani ohjelmistokonsultointiyritys. Myyn yksittäistä suunnittelu-, arkkitehti- ja
        kehitysosaamista
        asiakkaitteni ohjelmistoprojekteihin <em>laadukkaasti</em> ja <em>tehokkaasti</em> yli 15 vuoden kokemuksella.</p>

    <h2 class="margin-spacer">Osaamiseni</h2>
    <p>Laaja-alainen osaamiseni perustuu vuosien saatossa kertyneeseen kokemukseen erilaisista ohjelmointikielistä ja
        ohjelmistoprojekteista. Ensimmäiset ohjelmistoprojektit toteutin PHP-kielellä,
        josta pikku hiljaa siirryin tyypitettyyn Javaan.
    </p>
    <p>2010-luvulta lähtien osaamiseni on laajentunut yhä vahvemmin selainpään teknologioihin, kiitos edellisen työnantajani. Voinkin
        luonnehtia itseäni tätä nykyä puhtaasti <em>Full-Stack kehittäjäksi</em> lievällä palvelinpään painotuksella.
    </p>
    <p>Nykyisin suurimmat kiinnostuksen kohteeni ovat ohjelmistoarkkitehtuuri, sovelluksen tekninen suunnittelu sekä arkkitehtikeskeinen kehittäminen.</p>
    <p>Tarkemmin pääset tutustumaan profiiliini avaamalla <a href="/cv">ansioluetteloni.</a></p>


    <h2 class="margin-spacer">Omat projektit</h2>
    <p>Jokainen intohimoinen koodari harrastaa omia projektejaan. Alla eräs esimerkeistä, jonka olen toteuttanut.</p>
    <h3>SuperLender</h3>
    <p>Toteutin <a target="_blank" href="https://www.superlender.fi/">SuperLender</a>-vertaislainasovelluksen täysin itsenäisesti alusta tuotantoon. Ja mikä parasta, sain valita uusimmat mahdolliset teknologiat, <em>Angular 5</em> ja <em>Clojure</em>.
    </p>

    <p>Voit myös tutustua muihin projekteihini <a href="https://github.com/semitaho">GitHub</a>-sivustoltani.</p>
    <h2 class="margin-spacer">Miksi oma yritys?</h2>
    <p>Pystyn auttamaan asiakkaitani parhaalla, kilpailukykyisellä tuntihinnalla ilman yritysten välikäsiä ja samalla takaamaan laadukkaan
        lopputuloksen. Intohimoni on toimia itsenäisesti tietyn kokonaisuuden parissa tuloksekkaasti. Tästä olen saanut kiitosta
        lukuisilta asiakkailtani ollessani palkkatöissä.</p>
    <h2 class="margin-spacer">Kiinnostuitko?</h2>
    <p id="yhteystiedot">Ota yhteyttä, niin sovitaan toimeksianto!</p>
    <img class="cv-image" src="{{asset('/resources/assets/images/taho.jpg')}}">
    @include('contact-address')

@endsection

