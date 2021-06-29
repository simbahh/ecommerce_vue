<?php

use App\Bookable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('bookables', 'Api\BookableController@index');
Route::get('bookables/availability/{bookable}', 'Api\BookableAvailabilityController')->name('bookable.availability.show');
Route::get('bookables/reviews/{bookable}', 'Api\BookableReviewController')->name('bookable.reviews.index');

Route::apiResource('bookables', 'Api\BookableController')->only(['index', 'show']);

Route::apiResource('review', 'Api\ReviewController')->only(['show', 'store']);

Route::get('/booking-by-review/{reviewKey}', 'Api\BookingByReviewController')
    ->name('booking.by-review.show');

Route::get('bookables/{bookable}/price', 'Api\BookablePriceController')
->name('bookables.price.show');
// Route::get('bookables', function(Request $request){
//     return Bookable::all();
// });

// Route::get('bookables/{id}', function(Request $request, $bookable_id){
//     return Bookable::findOrFail($bookable_id);
// });


