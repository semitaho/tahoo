<!DOCTYPE html>
<html moznomarginboxes mozdisallowselectionprint lang="fi_FI">
<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122479437-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-122479437-1');
    </script>

    <title>@yield('title') - Taho Ohjelmistopalvelut</title>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @section('fb-meta')
        <meta property="og:title" content="Taho Ohjelmistopalvelut"/>
        <meta property="og:locale" content="fi_FI"/>
        <meta property="og:site_name" content="Taho Ohjelmistopalvelut"/>
        <meta property="og:image" content="fi_FI"/>

    <meta property="og:description" content="Tehokasta ohjelmistokonsultointia jo yli 10 vuoden kokemuksella."/>

    @show
    <meta name="author" content="Toni Aho"/>
    <meta name="description"
          content="Taho Ohjelmistopalvelut Oy on 2018 perustettu ohjelmistokonsultointiyritys, joka myy yksittäistä suunnittelu- ja kehitysapua asiakkaiden ohjelmistoprojekteihin laadukkaasti ja tehokkaasti yli 10 vuoden kokemuksella."/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" type="image/png" href="{{ asset('/resources/assets/icons/Tahoo_Logo_Fav.png') }}"/>

    @section('styles')
    <link href="{{ asset('/resources/assets/css/style.css') }}" rel="stylesheet"/>
    @show

</head>
<body>
@section('header')    
<section class="page-header">
    <nav class="header-nav">
        <ul>
            @foreach ($navigation as $item)
            <li class="{{Request::path() === $item['path'] ? 'active list-item': 'list-item'}}"><a href="{{url($item['path'])}}">{{ $item['label']}} </a>@if ($item['new']) <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/star-icon.png" alt="Uutta" /> @endif
            @endforeach
            <li><a target="_blank" href="https://www.facebook.fi/tahoohjelmistopalvelut"><img width="25" class="middle" src="{{ asset('/resources/assets/images/flogo-RGB-HEX-Blk-58.svg')}}" /></a></li>
        </ul>


    </nav>
    <h1 class="project-name"><a href="{{ asset('/') }}">Taho Ohjelmistopalvelut</a></h1>
    <h2 class="project-tagline">Tehokasta ohjelmistokonsultointia jo yli 10 vuoden kokemuksella.</h2>
</section>
@show
<div class="main-content">
@section('content')
This is the master sidebar.
@show
</div>
@include('footer')
@stack('scripts')
@section('endbody')
@show
</body>
</html>
