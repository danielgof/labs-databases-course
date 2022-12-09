import time, redis

cache = redis.Redis(host='127.0.0.1', port=6379)

def get_hit_counts():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)