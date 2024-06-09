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
    <a  href={{$blog->link}} class="blog-summary">
        <div class="blog-header">
            <img class="blog-image" src={{$blog->image}}></img>
        </div>
        <div class="blog-content">
            <h2>
                {{$blog->title}}</a>
            </h2>
            <em>{{date('d.m.Y', strtotime($blog->created))}}</em>
        </div>
    </a>
    @endforeach

    @else
    <p>Yhtään blogia ei ole vielä julkaistu.</p>
    @endif

</div>
@endsection
