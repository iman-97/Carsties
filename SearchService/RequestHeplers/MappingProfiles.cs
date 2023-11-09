﻿using AutoMapper;
using Contracts;
using SearchService.Models;

namespace SearchService.RequestHeplers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<AuctionCreated, Item>();
    }
}