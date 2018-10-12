@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/blogs.css') }}" rel="stylesheet"/>
@endsection
@section('title')
Blogikirjoitukset
@endsection
@section('content')
<h2>Uusimmat blogini</h2>
<div class="blogs text-center">
    @if (count($blogs) > 0)
    @foreach($blogs as $blog)
    <div class="blog-summary">
        <div class="blog-header">
            <em>{{$blog->created}}</em><br />

            <b>{{$blog->title}}</b>

        </div>
        <div class="blog-content">{{$blog->abstract}}</div>
    </div>
    @endforeach

    @else
    <p>Yhtään blogia ei ole vielä julkaistu.</p>
    @endif

</div>
@endsection
