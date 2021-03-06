<?php namespace App\Http\Controllers;

class InicioController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$tiposDenuncias = \App\TipoDenuncia::select('id', 'nome', 'imagem')->get();
		return view('app', ['tiposDenuncias' => $tiposDenuncias]);
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function home()
	{
		$tiposDenuncias = \App\TipoDenuncia::select('id', 'nome', 'imagem')->get();
		return view('home', ['tiposDenuncias' => $tiposDenuncias]);
	}

	/**
	 * Show the startup data
	 *
	 * @return Response
	 */
	public function dados()
	{
		$tiposDenuncias = \App\TipoDenuncia::select('id', 'nome', 'imagem')->get();
		$denuncias = \App\Denuncia::select('tipo', 'co_cnes', 'co_municipio', 'provedor', 'propriedade', 'plano', 'data', 'descricao', 'lat', 'lng')->latest('data')->get();
		return compact('tiposDenuncias', 'denuncias');
	}

}
