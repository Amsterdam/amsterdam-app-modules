""" SetFilter is used as a single way to set DB filtering based on kwargs. It saves a lot of duplicate and
    cluttering code from the views_*_.py where we'd like to return DB results based on set query parameters.

    If the value of a keyword is None, it will be omitted from the filter.

    e.g.:

    {'a': None, 'b': 1} will become {'b': 1}
"""


class SetFilter:
    """ Get kwargs and return filter
    """
    def __init__(self, **kwargs):
        self.kwargs = kwargs

    def get(self):
        """ Return filter
        :return: filter dictionary
        """
        filter_dict = dict()
        for kwarg in self.kwargs:
            if self.kwargs[kwarg] is not None:
                filter_dict[kwarg] = self.kwargs[kwarg]
        return filter_dict
