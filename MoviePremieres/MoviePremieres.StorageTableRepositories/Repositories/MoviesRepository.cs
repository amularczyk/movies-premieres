﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.WindowsAzure.Storage.Table;
using MoviePremieres.Domain.Models;
using MoviePremieres.Domain.Repositories;
using MoviePremieres.StorageTableRepositories.Models;

namespace MoviePremieres.StorageTableRepositories.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly CloudTable _table;

        public MoviesRepository(CloudTable table)
        {
            _table = table;
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            var query = new TableQuery<MovieEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "movie"));


            var movies = new List<Movie>();

            TableContinuationToken token = null;
            do
            {
                var resultSegment = await _table.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                foreach (var entity in resultSegment.Results)
                {
                    movies.Add(Mapper.Map<Movie>(entity));
                }
            } while (token != null);

            return movies;
        }

        public async Task Add(Movie movie)
        {
            var movieEntity = Mapper.Map<MovieEntity>(movie);
            movieEntity.PartitionKey = "movie";

            var insertOperation = TableOperation.Insert(movieEntity);

            await _table.ExecuteAsync(insertOperation);
        }

        public async Task AddMany(IEnumerable<Movie> movies)
        {
            var insertOperations = new TableBatchOperation();

            var movieEntities = Mapper.Map<IEnumerable<MovieEntity>>(movies);
            foreach (var movieEntity in movieEntities)
            {
                movieEntity.PartitionKey = "movie";
                insertOperations.Add(TableOperation.Insert(movieEntity));
            }


            await _table.ExecuteBatchAsync(insertOperations);
        }

        public Task<Movie> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task Update(Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}