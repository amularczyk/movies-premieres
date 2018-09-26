﻿using AutoMapper;
using MoviePremieres.CosmosDBRepositories.Models;
using MoviePremieres.Domain.Models;

namespace MoviePremieres.CosmosDBRepositories.Mappers
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<Movie, MovieEntity>();
            CreateMap<MovieEntity, Movie>();
        }
    }
}