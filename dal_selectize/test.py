"""Helpers for DAL user story based tests."""


class SelectizeStory(object):
    """Define Selectize CSS selectors."""

    clear_selector = '.selectize-selection__clear'
    container_selector = '.selectize-container'
    dropdown_selector = '.selectize-dropdown'
    input_selector = '.selectize-search__field'
    label_selector = '.selectize-selection__rendered'
    labels_selector = \
        '.selectize-selection__rendered .selectize-selection__choice'
    option_selector = '.selectize-results__option'
    widget_selector = '.selectize-selection'
