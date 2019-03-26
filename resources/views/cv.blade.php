@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/cv.css') }}" rel="stylesheet"/>

@endsection

@section('title')
CV
@endsection

@section('content')

    <div class="grid-container grid-header">
        <div>
            <h2>ANSIOLUETTELO</h2>
            <a href="javascript:;" onClick="window.print();">Tulosta / tallenna CV</a>

            <br/>
            <img class="cv-image" src="{{asset('/resources/assets/images/taho.jpg')}}">
            <br/>
            @include('contact-address')

        </div>

    </div>
    <hr/>
    <div class="grid-container grid-cv">
        @component('title')
        Profiili
        @endcomponent
        <div>
            @foreach($profiles as $profile)
            <p>{{$profile['section_fi']}}</p>
            @endforeach
        </div>
    </div>
    <hr/>

    <div class="grid-container grid-cv">
        @component('title')
        Avainosaamisalueet
        @endcomponent
        <div>
            <ul>
                @foreach($key_areas as $key_area)
                <li>{{$key_area['name_fi']}}</li>
                @endforeach
            </ul>
        </div>
    </div>
    <hr/>
    <div class="grid-container page-break">
        @component('title')
        Koulutus
        @endcomponent
        @foreach($education as $item)
        <div class="grid-container grid-education-item">
            <div>{{$item['time_range']}}</div>
            <div>
                <strong>{{$item['school_name_fi']}}</strong><br/>
                <span>{{$item['examination_name_fi']}}</span>
                @if ($item['description_fi'])
                <br/>
                <span>{{$item['description_fi']}}</span>
                @endif
            </div>
        </div>
        @endforeach
    </div>
    <hr/>
    <div class="grid-container grid-experience">
        @component('title')
        Kokemus
        @endcomponent
        @foreach($skill_categories as $index => $category)
        <div class="grid-container grid-category  {{$index === 3 ? 'page-section-break': ''}}">
            <div><h4>{{$category['category_name']}}</h4></div>
            <div class="grid-container grid-skill">
                <div></div>
                <div class="header"><strong><em>Kokemus</em></strong></div>
                @foreach($category['items'] as $skill)
                <div class="skill"><em>{{$skill['skill_name']}}</em></div>
                <div class="experience">{{$skill['experience']}} vuotta</div>
                @endforeach
            </div>

        </div>
        @endforeach


    </div>
    <hr/>
    <div class="grid-container grid-projects page-break">
        @component('title')
        Asiakasprojektit
        @endcomponent
        @foreach($projects as $project)

        <div class="grid-container grid-project">
            <div class="grid-title"><h4>{{$project['name_fi']}}</h4></div>
            <div class="grid-container grid-project-desc">
                @if ($project['customer_name_fi'])
                <div><strong>Asiakas</strong></div>
                <div>{{$project['customer_name_fi']}}</div>
                @endif
                <div><strong>Rooli</strong></div>
                <div>{{$project['role_name_fi']}}</div>
                <div><strong>Ajankohta</strong></div>
                <div>{{$project['time_range']}}</div>
                <div><strong>Työtehtävät</strong></div>
                <div>{{$project['description_fi']}}</div>

                <div><strong>Teknologiat</strong></div>
                <div><em>{{$project['technology']}}</em></div>

            </div>

        </div>
        @endforeach


    </div>
    <hr/>
    <div class="grid-container">
        @component('title')
        Sertifikaatit
        @endcomponent
        <div class="grid-container grid-certificate">
            <div><strong>Sertifikaatti</strong></div>
            <div><strong>Suoritettu</strong></div>

            @foreach($certificates as $certificate)
            <div>{{$certificate['name']}}</div>
            <div>{{$certificate['acquired']}}</div>
            @endforeach
        </div>

    </div>
    <hr/>

@endsection
