@extends('layout')
@section('styles')
@parent

@endsection
@section('title')
Ota yhteyttä
@endsection
@section('content')
<div id="contact">
</div>
@endsection

@push('scripts')
<script src="{{ asset('/public/js/contact.js') }}">
</script>
@endpush