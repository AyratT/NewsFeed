<?php

namespace App\Repositories;

use App\Events\Models\User\UserCreated;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    public function getTotal(): int
    {
        return $this->model::query()->count();
    }

    public function getPaginated(int $limit = 10, int $offset = 0): Collection
    {
        $query = $this->model::query();

        return $query
            ->limit($limit)
            ->offset($offset)
            ->get();
    }

    function create($data): Model
    {
        $createdUser = $this->model::query()->create($data);
        event(new UserCreated($createdUser));
        return $createdUser;
    }
}
