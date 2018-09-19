﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.Domain.Repositories
{
    public interface IMoviesRepository
    {
        Task<IEnumerable<Movie>> GetAll();
        Task Create(Movie movie);
    }
}