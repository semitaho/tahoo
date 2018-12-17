@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/pelit.css') }}" rel="stylesheet"/>

@endsection

@section('title')
Pelit
@endsection
@section('header')
<section class="page-header">
    <nav class="header-nav">
        <ul>
            @foreach ($navigation as $item)
            <li class="{{Request::path() === $item['path'] ? 'active': ''}}"><a href="{{url($item['path'])}}">{{ $item['label']}}</a></li>
            @endforeach
            <li><a target="_blank" href="https://www.facebook.fi/tahoohjelmistopalvelut"><img width="25" class="middle" src="{{ asset('/resources/assets/images/flogo-RGB-HEX-Blk-58.svg')}}" /></a></li>
        </ul>


    </nav>
</section>
@endsection
@section('content')
<div id="pelit">
</div>
@endsection

@push('scripts')
<script src="{{ asset('/public/js/pelit.js') }}">
</script>
@endpush