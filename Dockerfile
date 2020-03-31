FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
#ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS http://*:5050
EXPOSE 5050

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS builder
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "API.dll"]
