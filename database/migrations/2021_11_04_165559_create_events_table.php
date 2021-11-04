<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration {
    public function up() {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('date');
            $table->integer('duration');
            $table->foreignId('calendar_id')->constrained('calendars')->onDelete('cascade');
            $table->enum('category', ['arrangement', 'reminder', 'task']);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('events');
    }
}
