import string
import random

def generate_random_sequence(length=10)->str:
    """Generates a sequence of a given length

    Args:
        length (int, optional): Sequence length. Defaults to 10.

    Returns:
        str: Generated sequence
    """
    characters = string.ascii_letters + string.digits
    random_sequence = ''.join(random.choice(characters) for _ in range(length))
    return random_sequence