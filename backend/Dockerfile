FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies 
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Static files - for django admin page
RUN python manage.py collectstatic --noinput

# Environment settings
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Start server
CMD ["gunicorn", "web_dev_back.wsgi:application", "--bind", "0.0.0.0:8000"]
