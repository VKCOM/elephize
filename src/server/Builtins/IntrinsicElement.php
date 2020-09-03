<?php

namespace __ROOTNS__\Builtins;

class IntrinsicElement extends RenderableComponent {
    public static function register() {
        // Do nothing
    }

    private static $_store = [];
    public static function get(string $name): IntrinsicElement {
        if (!isset(self::$_store[$name])) {
            self::$_store[$name] = new IntrinsicElement($name);
        }

        return self::$_store[$name];
    }

    private $_empty_tags = [
        'area',
        'base',
        'br',
        'col',
        'colgroup',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
    ];
    private $_tag_name = '';

    /**
     * IntrinsicElement constructor.
     * @param string $tag_name
     */
    public function __construct($tag_name) {
        $this->_tag_name = $tag_name;
    }

    /**
     * @param string[] $children
     * @return array
     */
    protected function separateTextNodes(array $children) {
        $new_children = [];
        // Add <!-- --> between simple text nodes to make react hydration happy in case of vars interpolation.
        for ($i = 0; $i < count($children) - 1; $i++) {
            $new_children[] = $children[$i];
            // Rendered content is not html tags -> use separator
            if ($children[$i][0] !== '<' && $children[$i + 1][0] !== '<') {
                $new_children[] = '<!-- -->';
            }
        }
        // Add last child
        if (!empty($children)) {
            $new_children[] = $children[count($children) - 1];
        }

        // Trim first and last child at the beginning and at the end.
        if (!empty($new_children)) {
            $new_children[0] = ltrim($new_children[0]);
            $new_children[count($new_children) - 1] = rtrim($new_children[count($new_children) - 1]);
        }

        return $new_children;
    }

    /**
     * @param array $props
     * @param array $children
     * @return string
     */
    public function render(array $props, array $children) {
        // Attributes rendering
        $attrs = [];
        if (isset($props['___root'])) {
            unset($props['___root']);
        }

        foreach ($props as $name => $value) {
            if (empty($value) || $name === 'key' || $name === 'ref') {
                // key is not required in server rendering at all;
                // ref is client-only thing
                // also we don't render empty attrs
                continue;
            }
            if ($name === 'className') {
                $name = 'class';
            }
            if ($value === true) {
                $value = 'true';
            }
            $attrs[] = $name . '="' . htmlspecialchars($value) . '"';
        }

        $att_string = empty($attrs) ? '' : (' ' . implode(' ', $attrs));
        if (in_array($this->_tag_name, $this->_empty_tags, true)) {
            return '<' . $this->_tag_name . $att_string . '/>';
        } else {
            return '<' . $this->_tag_name . $att_string . '>' . implode('', $this->separateTextNodes($this->flatten($children))) . '</' . $this->_tag_name . '>';
        }
    }
}
