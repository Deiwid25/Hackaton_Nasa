from django.http import JsonResponse
import json

def get_geojson(request):
    # Ruta al archivo GeoJSON en tu sistema de archivos
    geojson_file_path = './dalas_PM25.geojson'

    try:
        # Lee el contenido del archivo GeoJSON
        with open(geojson_file_path, 'r') as geojson_file:
            geojson_data = json.load(geojson_file)
            return JsonResponse(geojson_data)
    except FileNotFoundError:
        return JsonResponse({'error': 'Archivo GeoJSON no encontrado'}, status=404)
