;(function ($) {
    
    function get_forwards(element) {
        var forwardElem, forwardList, prefix, forwardedData, divSelector, form;
        divSelector = "div.dal-forward-conf#dal-forward-conf-for-" +
                element.attr("id");
        form = element.length > 0 ? $(element[0].form) : $();
        forwardElem = form.find(divSelector).find('script');
        if (forwardElem.length === 0) {
            return;
        }
        try {
            forwardList = JSON.parse(forwardElem.text());
        } catch (e) {
            return;
        }

        if (!Array.isArray(forwardList)) {
            return;
        }
            
        prefix = $(element).getFormPrefix();
        forwardedData = {};

        $.each(forwardList, function(ix, f) {
            if (f["type"] === "const") {
                forwardedData[f["dst"]] = f["val"];
            } else if (f["type"] === "field") {
                var srcName, dstName;
                srcName = f["src"];
                if (f.hasOwnProperty("dst")) {
                    dstName = f["dst"];
                } else {
                    dstName = srcName;
                }
                // First look for this field in the inline
                $field = $('[name=' + prefix + srcName + ']');
                if (!$field.length)
                    // As a fallback, look for it outside the inline
                    $field = $('[name=' + srcName + ']');
                if ($field.length)
                    forwardedData[dstName] = $field.val();

            }
        });
        return JSON.stringify(forwardedData);
    }

    $(document).on('autocompleteLightInitialize', '[data-autocomplete-light-function=selectize]', function() {
        var element = $(this);        
        var ajax = null;
        if ($(this).attr('data-autocomplete-light-url')) {
            ajax = function(query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: element.attr('data-autocomplete-light-url'),
                    dataType: 'json',
                    delay: 250,
                    data: {
                        q: query,
                        //page: params.page,
                        create: element.attr('data-autocomplete-light-create') && !element.attr('data-tags'),
                        forward: get_forwards(element)
                    },
                    success: function(data) {
                        if (element.attr('data-tags')) {
                            $.each(data.results, function(index, item) {
                                item.value = item.text;
                            });
                        }
                        callback(data.results);
                    },
                    cache: true
                });
            }
        }

        // This widget has a clear button
        element.find('option[value=""]').remove();

        // Bind selectize
        element.selectize({
            plugins: ['remove_button'],
            delimiter: element.attr('data-tags') ? ',' : null,
            allowEmptyOption: ! element.is('required'),
            preload: false,
            load: ajax,
            render: {
                option: function(data, escape) {
                    return "<div>" + data.text + "</div>";
                },
                item: function(data, escape) {
                    return "<div>" + data.text + "</div>";
                }
            }
        });

    });

    $('[data-autocomplete-light-function]:not([id*="__prefix__"])').each(function() {
        window.__dal__initialize(this);
    });
})(yl.jQuery);
