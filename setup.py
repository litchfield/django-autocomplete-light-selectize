import os

from setuptools import setup, find_packages


# Utility function to read the README file.
# Used for the long_description. It's nice, because now 1) we have a top level
# README file and 2) it's easier to type in the README file than to put a raw
# string in below ...
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name='django-autocomplete-light-selectize',
    version='0.1',
    description='Selectize support for Django Autocomplete Light',
    author='Simon Litchfield',
    author_email='simon@litchfield.digital',

    url="http://github.com/litchfield/django-autocomplete-light-selectize",
    license="MIT License",
    keywords='django autocomplete',
    platforms=["any"],
    packages=['dal_selectize'],
    #data_files=[(template_dir, templates)],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Software Development :: Libraries :: Python Modules',

    ],
    include_package_data=True,
)
