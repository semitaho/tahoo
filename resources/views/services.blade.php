@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/services.css') }}" rel="stylesheet"/>
@endsection

@section('title')
Palvelut
@endsection

@section('content')
<div class="center">
    <h2>Palveluni</h2>

    <p>Myyn ohjelmistokonsultoinnin lisäksi kiinteähintaisia pienprojekteja.</p>

    <p>
        <em>Ohjelmistokonsultointi</em><br/>
        <b>75 € / tunti + alv.</b>
    </p>

    <p>
        <em>Ohjelmistokonsultointi</em><br/>
        <b>75 € / tunti</b>
    </p>

</div>
@endsection

