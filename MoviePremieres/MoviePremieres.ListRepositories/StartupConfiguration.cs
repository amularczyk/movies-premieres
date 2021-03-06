﻿using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.ListRepositories.Repositories;

namespace MoviePremieres.ListRepositories
{
    public static class StartupConfiguration
    {
        public static void RegisterListRepositories(this IServiceCollection services)
        {
            services.AddTransient<IMoviesRepository, MoviesRepository>();
        }
    }
}